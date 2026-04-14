"use client";

import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { Check, CircleCheck, ExternalLink, Send, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const programs = [
  {
    id: "cyber",
    name: "Cyber Security & Ethical Hacking",
    value: "Cyber Security & Ethical Hacking",
    features: ["Threat Analysis", "Network Security", "Vulnerability Assessment"],
  },
  {
    id: "web",
    name: "Web Development",
    value: "Web Development",
    features: ["React & Next.js", "Modern CSS", "Full-stack integration"],
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    value: "Artificial Intelligence",
    features: ["Machine Learning", "Neural Networks", "Data Engineering"],
    isRecommended: true,
  },
  {
    id: "app",
    name: "App Development",
    value: "App Development",
    features: ["Cross-platform", "UI/UX Design", "Performance Optimization"],
  },
  {
    id: "ar",
    name: "AR & Game Development",
    value: "AR & Game Development",
    features: ["Unity/Unreal", "Spatial Audio", "3D Modeling"],
  },
  {
    id: "python",
    name: "Advanced Python Programming",
    value: "Advanced Python Programming",
    features: ["Automation", "Back-end Architectures", "Scripting"],
  },
];

export default function RegistrationForm() {
  const [selectedProgram, setSelectedProgram] = useState(programs[2].value);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const iframeRef = useRef(null);

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    // Google Form submission via target iframe handles the actual POST
  };

  const handleIframeLoad = () => {
    if (isSubmitting) {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl"
      >
        <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CircleCheck className="w-10 h-10 text-brand-accent" />
        </div>
        <h3 className="text-3xl display-font font-bold mb-4">Application Received</h3>
        <p className="text-brand-silver mb-8 max-w-md mx-auto">
          Your profile has been successfully integrated into our system. 
          Join the WhatsApp group below for official communication and next steps.
        </p>
        <a 
          href="https://chat.whatsapp.com/H7ym02zyZI18A1ymOHfBS2" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
        >
          Join WhatsApp Group <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Hidden Iframe for silent submission */}
      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        ref={iframeRef}
        style={{ display: "none" }}
        onLoad={handleIframeLoad}
      />

      <form 
        action="https://docs.google.com/forms/d/e/1FAIpQLSeElcFnQioA6aWk6KsWL1WPDaZEXQwnRyw61loMmDv9IguxZA/formResponse"
        method="POST"
        target="hidden_iframe"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* LEFT COLUMN: Personal Details */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl display-font font-bold text-white tracking-tight">
              Registration Space
            </h3>
            <p className="text-sm text-brand-silver">
              Complete your profile for the GoThree Internship programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-widest text-brand-silver opacity-80">Full Name</Label>
              <Input id="name" name="entry.535482351" required placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-widest text-brand-silver opacity-80">Email Address</Label>
              <Input id="email" name="entry.1598668623" type="email" required placeholder="john@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-brand-silver opacity-80">WhatsApp Number</Label>
              <Input id="phone" name="entry.2135682894" required placeholder="+91 00000 00000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college" className="text-xs uppercase tracking-widest text-brand-silver opacity-80">College Name</Label>
              <Input id="college" name="entry.1116676742" required placeholder="Your University" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dept" className="text-xs uppercase tracking-widest text-brand-silver opacity-80">Department</Label>
              <Select name="entry.1298136400" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year" className="text-xs uppercase tracking-widest text-brand-silver opacity-80">Year of Study</Label>
              <Select name="entry.247787211" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="why" className="text-xs uppercase tracking-widest text-brand-silver opacity-80">Why are you interested?</Label>
            <Textarea 
              id="why" 
              name="entry.966269313" 
              placeholder="Tell us about your motivation..." 
              required
              className="resize-none h-32"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Program Selection */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-white/5 bg-white/[0.02] backdrop-blur-xl">
            <CardContent className="pt-6">
              <h4 className="font-bold text-white mb-4">Internship Program Selection</h4>
              
              <RadioGroup
                value={selectedProgram}
                onValueChange={setSelectedProgram}
                name="entry.1886664800"
                className="space-y-4"
                required
              >
                {programs.map((program) => (
                  <label
                    key={program.id}
                    htmlFor={program.id}
                    className={cn(
                      "relative block cursor-pointer rounded-xl border p-4 transition-all duration-300",
                      selectedProgram === program.value
                        ? "border-brand-accent/50 bg-brand-accent/5 ring-1 ring-brand-accent/20"
                        : "border-white/5 bg-white/[0.01] hover:border-white/10"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 shrink-0">
                        <RadioGroupItem value={program.value} id={program.id} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-white leading-tight">
                            {program.name}
                          </span>
                          {program.isRecommended && (
                            <Badge variant="secondary" className="bg-brand-accent/20 text-brand-accent border-brand-accent/10 py-0 text-[10px]">
                              POPULAR
                            </Badge>
                          )}
                        </div>
                        <ul className="grid grid-cols-1 gap-1">
                          {program.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2 text-[10px] text-brand-silver font-medium uppercase tracking-wider">
                              <Check className="w-3 h-3 text-brand-accent" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <div className="mt-8 space-y-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-white/90 font-bold h-12 rounded-xl group"
                >
                  {isSubmitting ? "Processing..." : "Submit Application"}
                  {!isSubmitting && <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </Button>
                <p className="text-[10px] text-center text-brand-silver uppercase tracking-widest opacity-60">
                  By submitting, you agree to our program guidelines.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
