import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { Users, UserPlus, MoreHorizontal, Shield, User, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

interface TeamMember {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  last_login_at: string | null;
  is_current_user: boolean;
}

interface Invitation {
  id: string;
  email: string;
  role: string;
  created_at: string;
  status: "pending" | "accepted" | "expired";
}

// Mock data - in real app, this would come from a hook
const MOCK_MEMBERS: TeamMember[] = [
  { id: "1", email: "ferran@acme.com", full_name: "Ferran Mitjans", role: "org_admin", last_login_at: new Date().toISOString(), is_current_user: true },
  { id: "2", email: "maria@acme.com", full_name: "Maria Garcia", role: "user", last_login_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), is_current_user: false },
  { id: "3", email: "joan@acme.com", full_name: "Joan López", role: "user", last_login_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), is_current_user: false },
];

const MOCK_INVITATIONS: Invitation[] = [
  { id: "inv1", email: "anna@acme.com", role: "user", created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: "pending" },
];

export const TeamTab = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  
  const isAdmin = profile?.role === "org_admin";
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "user",
    message: "",
  });
  const [isInviting, setIsInviting] = useState(false);

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
    if (!inviteForm.email) return;
    
    setIsInviting(true);
    try {
      // Mock invitation - in real app, call API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(t("settings.team.inviteSent", { email: inviteForm.email }));
      setInviteForm({ email: "", role: "user", message: "" });
      setIsInviteOpen(false);
    } catch (error) {
      toast.error(t("settings.team.inviteError"));
    } finally {
      setIsInviting(false);
    }
  };

  const handleChangeRole = (memberId: string, newRole: string) => {
    toast.success(t("settings.team.roleChanged"));
  };

  const handleRemoveMember = (memberId: string) => {
    toast.success(t("settings.team.memberRemoved"));
  };

  const handleResendInvite = (inviteId: string) => {
    toast.success(t("settings.team.inviteResent"));
  };

  const handleCancelInvite = (inviteId: string) => {
    toast.success(t("settings.team.inviteCanceled"));
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

  const getInitials = (name: string | null, email: string) => {
    if (name) return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    return email.charAt(0).toUpperCase();
  };

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
                {isInviting ? t("common.sending") : t("settings.team.sendInvite")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Members List */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {MOCK_MEMBERS.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(member.full_name, member.email)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{member.full_name || member.email}</p>
                    {member.is_current_user && (
                      <Badge variant="outline" className="text-xs">{t("settings.team.you")}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
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
                  <p className="text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {formatLastLogin(member.last_login_at)}
                  </p>
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

      {/* Pending Invitations */}
      {MOCK_INVITATIONS.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">{t("settings.team.pendingInvitations")}</h4>
          
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {MOCK_INVITATIONS.map((invite) => (
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
                    <Button variant="ghost" size="sm" onClick={() => handleResendInvite(invite.id)}>
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
        {t("settings.team.usersCount", { current: MOCK_MEMBERS.length, limit: "∞" })}
      </p>
    </div>
  );
};
