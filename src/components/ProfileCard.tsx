import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dribbble, Twitter, Instagram, Mail } from "lucide-react";
import photo from "../assets/photooo.png";

const ProfileCard = () => {
  return (
    <Card className="rounded-3xl border-none bg-white/5 p-5 shadow-card sm:p-8">
      <div className="flex flex-col items-center space-y-6 text-center sm:space-y-8">
        {/* Profile Photo */}
        <div className="relative">
          <img
            src={photo}
            alt="parmida shoeibzadeh - Frontend Developer"
            className="h-44 w-44 rounded-3xl object-cover opacity-65 shadow-glow sm:h-56 sm:w-56 lg:h-60 lg:w-60"
          />
        </div>

        {/* Name and Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground text-white sm:text-3xl">
            Parmida shoeibzadeh
          </h1>
          <p className="text-base text-muted-foreground text-white/80 sm:text-lg">
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
          onClick={() => window.location.href = "/contact"}
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
