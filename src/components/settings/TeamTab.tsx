import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Users, UserPlus, MoreHorizontal, Shield, User, Mail, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TeamInvitation, TeamMember } from "@/types/database";

export const TeamTab = () => {
  const { t } = useTranslation();
  const { profile, account, user } = useAuth();
  
  const isAdmin = profile?.role === "org_admin";
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [pendingInvitations, setPendingInvitations] = useState<TeamInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "user",
    message: "",
  });
  const [isInviting, setIsInviting] = useState(false);

  const loadTeamData = useCallback(async () => {
    if (!account?.id) return;
    
    setIsLoading(true);
    try {
      // Load members (users with the same account_id)
      const { data: membersData, error: membersError } = await supabase
        .from("user_profiles")
        .select("id, full_name, role, account_id")
        .eq("account_id", account.id);

      if (membersError) {
        console.error("Error loading members:", membersError);
        toast.error(t("settings.team.loadError"));
      }

      // Load pending invitations
      const { data: invitationsData, error: invitationsError } = await supabase
        .from("team_invitations")
        .select("*")
        .eq("account_id", account.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (invitationsError) {
        console.error("Error loading invitations:", invitationsError);
      }

      if (membersData) {
        // Get current user's email from auth session
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        
        setMembers(membersData.map(m => ({
          ...m,
          // Email only available for current user from auth
          email: m.id === currentUser?.id ? currentUser.email : undefined,
          is_current_user: m.id === currentUser?.id
        })));
      }
      
      if (invitationsData) {
        setPendingInvitations(invitationsData as TeamInvitation[]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [account?.id, user?.id, t]);

  useEffect(() => {
    if (isAdmin) {
      loadTeamData();
    }
  }, [loadTeamData, isAdmin]);

  // If not admin, show message
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">{t("settings.team.noAccess")}</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {t("settings.team.noAccessDescription")}
        </p>
      </div>
    );
  }

  const handleInvite = async () => {
    if (!inviteForm.email || !account?.id || !user?.id) return;
    
    setIsInviting(true);
    try {
      // Generate unique token
      const token = crypto.randomUUID();
      
      // Calculate expiry date (7 days)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      
      // Insert invitation and get the record
      const { data: invitation, error } = await supabase
        .from("team_invitations")
        .insert({
          account_id: account.id,
          email: inviteForm.email.toLowerCase().trim(),
          role: inviteForm.role,
          invited_by: user.id,
          token: token,
          expires_at: expiresAt.toISOString(),
          status: "pending"
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          toast.error(t("settings.team.inviteAlreadyExists"));
        } else {
          console.error("Invite error:", error);
          toast.error(t("settings.team.inviteError"));
        }
        return;
      }

      // Send email via Edge Function
      const { error: emailError } = await supabase.functions.invoke("send-team-invitation", {
        body: {
          invitation_id: invitation.id,
          email: inviteForm.email.toLowerCase().trim(),
          invitation_token: token,
          company_name: account.company_name,
          role: inviteForm.role,
          inviter_name: profile?.full_name || user.email,
          language: i18n.language?.substring(0, 2) || "es"
        }
      });

      if (emailError) {
        console.error("Error sending invitation email:", emailError);
        toast.warning(t("settings.team.inviteCreatedNoEmail"));
      } else {
        toast.success(t("settings.team.inviteSent", { email: inviteForm.email }));
      }

      setInviteForm({ email: "", role: "user", message: "" });
      setIsInviteOpen(false);
      loadTeamData();
    } catch (error) {
      console.error("Invite error:", error);
      toast.error(t("settings.team.inviteError"));
    } finally {
      setIsInviting(false);
    }
  };

  const handleChangeRole = async (memberId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({ role: newRole })
        .eq("id", memberId);

      if (error) throw error;
      
      toast.success(t("settings.team.roleChanged"));
      loadTeamData();
    } catch (error) {
      console.error("Role change error:", error);
      toast.error(t("common.error"));
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      // Only unlink from account, don't delete the user
      const { error } = await supabase
        .from("user_profiles")
        .update({ account_id: null, role: "user" })
        .eq("id", memberId);

      if (error) throw error;
      
      toast.success(t("settings.team.memberRemoved"));
      loadTeamData();
    } catch (error) {
      console.error("Remove member error:", error);
      toast.error(t("common.error"));
    }
  };

  const handleResendInvite = async (invite: TeamInvitation) => {
    try {
      // Update expiry date and generate new token
      const newExpiry = new Date();
      newExpiry.setDate(newExpiry.getDate() + 7);
      const newToken = crypto.randomUUID();
      
      const { error } = await supabase
        .from("team_invitations")
        .update({ 
          expires_at: newExpiry.toISOString(),
          token: newToken,
          created_at: new Date().toISOString() 
        })
        .eq("id", invite.id);

      if (error) throw error;
      
      // Resend email via Edge Function
      await supabase.functions.invoke("send-team-invitation", {
        body: {
          invitation_id: invite.id,
          email: invite.email,
          invitation_token: newToken,
          company_name: account?.company_name,
          role: invite.role,
          inviter_name: profile?.full_name || user?.email,
          language: i18n.language?.substring(0, 2) || "es"
        }
      });
      
      toast.success(t("settings.team.inviteResent"));
      loadTeamData();
    } catch (error) {
      console.error("Resend invite error:", error);
      toast.error(t("common.error"));
    }
  };

  const handleCancelInvite = async (inviteId: string) => {
    try {
      const { error } = await supabase
        .from("team_invitations")
        .update({ status: "cancelled" })
        .eq("id", inviteId);

      if (error) throw error;
      
      toast.success(t("settings.team.inviteCanceled"));
      loadTeamData();
    } catch (error) {
      console.error("Cancel invite error:", error);
      toast.error(t("common.error"));
    }
  };

  const formatLastLogin = (date: string | null) => {
    if (!date) return t("settings.team.never");
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 5) return t("settings.team.justNow");
    if (diffHours < 1) return t("settings.team.minutesAgo", { count: diffMins });
    if (diffDays < 1) return t("settings.team.hoursAgo", { count: diffHours });
    return t("settings.team.daysAgo", { count: diffDays });
  };

  const getInitials = (name: string | null, email?: string) => {
    if (name) return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    if (email) return email.charAt(0).toUpperCase();
    return "?";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="rounded-lg border border-border overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Invite Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.team.members")}</h3>
        </div>
        
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              {t("settings.team.inviteMember")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("settings.team.inviteMember")}</DialogTitle>
              <DialogDescription>{t("settings.team.inviteDescription")}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email</Label>
                <Input
                  id="invite-email"
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="colleague@company.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label>{t("settings.team.role")}</Label>
                <RadioGroup
                  value={inviteForm.role}
                  onValueChange={(value) => setInviteForm(prev => ({ ...prev, role: value }))}
                  className="space-y-2"
                >
                  <div className="flex items-start space-x-3 rounded-lg border border-border p-3">
                    <RadioGroupItem value="user" id="role-user" className="mt-0.5" />
                    <div>
                      <Label htmlFor="role-user" className="font-medium cursor-pointer">
                        {t("settings.team.roleUser")}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {t("settings.team.roleUserDescription")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg border border-border p-3">
                    <RadioGroupItem value="org_admin" id="role-admin" className="mt-0.5" />
                    <div>
                      <Label htmlFor="role-admin" className="font-medium cursor-pointer">
                        {t("settings.team.roleAdmin")}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {t("settings.team.roleAdminDescription")}
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="invite-message">{t("settings.team.personalMessage")}</Label>
                <Textarea
                  id="invite-message"
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder={t("settings.team.personalMessagePlaceholder")}
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                {t("common.cancel")}
              </Button>
              <Button onClick={handleInvite} disabled={isInviting || !inviteForm.email}>
                {isInviting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t("common.sending")}
                  </>
                ) : (
                  t("settings.team.sendInvite")
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Members List */}
      {members.length === 0 ? (
        <div className="rounded-lg border border-border p-8 text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">{t("settings.team.noMembers")}</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(member.full_name, member.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{member.full_name || member.email || t("settings.team.unknownUser")}</p>
                      {member.is_current_user && (
                        <Badge variant="outline" className="text-xs">{t("settings.team.you")}</Badge>
                      )}
                    </div>
                    {member.email && (
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={member.role === "org_admin" ? "default" : "secondary"}>
                      {member.role === "org_admin" ? (
                        <><Shield className="h-3 w-3 mr-1" />{t("settings.team.admin")}</>
                      ) : (
                        <><User className="h-3 w-3 mr-1" />{t("settings.team.member")}</>
                      )}
                    </Badge>
                    {member.last_sign_in_at && (
                      <p className="text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {formatLastLogin(member.last_sign_in_at)}
                      </p>
                    )}
                  </div>
                  
                  {!member.is_current_user && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleChangeRole(member.id, member.role === "org_admin" ? "user" : "org_admin")}>
                          {member.role === "org_admin" ? t("settings.team.makeUser") : t("settings.team.makeAdmin")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          {t("settings.team.remove")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">{t("settings.team.pendingInvitations")}</h4>
          
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {pendingInvitations.map((invite) => (
                <div key={invite.id} className="flex items-center justify-between p-4 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-muted">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{invite.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("settings.team.invitedAgo", { time: formatLastLogin(invite.created_at) })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{t("settings.team.pending")}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleResendInvite(invite)}>
                      {t("settings.team.resend")}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleCancelInvite(invite.id)}>
                      {t("common.cancel")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Usage Info */}
      <p className="text-sm text-muted-foreground">
        {t("settings.team.usersCount", { current: members.length, limit: "∞" })}
      </p>
    </div>
  );
};
