import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dribbble, Twitter, Instagram, Mail } from "lucide-react";
import photo from "../assets/photooo.png";

const ProfileCard = () => {
  return (
    <Card className="bg-white/5 border-none p-8 rounded-3xl shadow-card">
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Profile Photo */}
        <div className="relative">
          <img
            src={photo}
            alt="parmida shoeibzadeh - Frontend Developer"
            className="w-60 h-60 opacity-65 rounded-3xl object-cover shadow-glow"
          />
        </div>

        {/* Name and Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground text-white">
            Parmida shoeibzadeh
          </h1>
          <p className="text-muted-foreground text-white/80 text-lg">
          Frontend Developer
          </p>
          <p className="text-muted-foreground text-white/80">
            Istanbul, Turkey
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-surface-variant rounded-xl"
          >
            <Dribbble className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-surface-variant rounded-xl"
          >
            <Twitter className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-surface-variant rounded-xl"
          >
            <Instagram className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-surface-variant rounded-xl"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </div>

        {/* Let's Talk Button */}
        <Button
          variant="portfolio"
          size="portfolio"
          className="w-full bg-[#7A43C1]"
        >
          Let's Talk
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCard;
