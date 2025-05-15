// src/constants/integrations.ts
import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons";
import { ArrowRight, MessageSquare, Mail, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  icon: React.ReactNode;
  description: string;
  strategy: 'INSTAGRAM' | 'CRM' | 'EMAIL' | 'WHATSAPP' | 'TEAM';
  gradient: string;
  buttonVariant: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
};

// Helper component to properly type the icons
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <InstagramDuoToneBlue {...props} />
);

const SalesforceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <SalesForceDuoToneBlue {...props} />
);

export const INTEGRATION_CARDS: Props[] = [
  {
    title: 'Connect Instagram',
    description: 'Automate DMs, comments & grow your audience with AI-powered engagement',
    icon: <InstagramIcon className="w-8 h-8" />,
    strategy: 'INSTAGRAM',
    gradient: 'bg-gradient-to-br from-pink-500 to-purple-600',
    buttonVariant: 'default'
  },
  {
    title: 'Connect Salesforce',
    description: 'Sync customer data between your CRM and social media for better tracking',
    icon: <SalesforceIcon className="w-8 h-8" />,
    strategy: 'CRM',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
    buttonVariant: 'default'
  },
  {
    title: 'Email Marketing',
    description: 'Convert Instagram leads to email subscribers automatically',
    icon: <Mail className="w-8 h-8 text-orange-500" />,
    strategy: 'EMAIL',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
    buttonVariant: 'outline'
  },
  {
    title: 'WhatsApp Integration',
    description: 'Continue conversations from Instagram to WhatsApp seamlessly',
    icon: <MessageSquare className="w-8 h-8 text-green-500" />,
    strategy: 'WHATSAPP',
    gradient: 'bg-gradient-to-br from-green-500 to-teal-500',
    buttonVariant: 'outline'
  },
  {
    title: 'Team Collaboration',
    description: 'Assign messages to team members and track responses',
    icon: <Users className="w-8 h-8 text-indigo-500" />,
    strategy: 'TEAM',
    gradient: 'bg-gradient-to-br from-indigo-500 to-violet-500',
    buttonVariant: 'outline'
  }
];

export function IntegrationCard({ card }: { card: Props }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden group transition-all hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm">
      <div className={`${card.gradient} h-2 w-full`} />
      
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border">
            {card.icon}
          </div>
          <div>
            <CardTitle className="text-lg">{card.title}</CardTitle>
            <CardDescription className="text-sm mt-1">
              {card.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardFooter className="mt-auto">
        <Button 
          variant={card.buttonVariant}
          className={`w-full group-hover:shadow-sm transition-all ${
            card.strategy === 'INSTAGRAM' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' :
            card.strategy === 'CRM' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : ''
          }`}
        >
          Connect
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}