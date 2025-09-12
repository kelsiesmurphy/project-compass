import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { brand } from "@/lib/constants/brand";
import Footer from "@/components/footer";

export default function AboutUs() {
  return (
    <div className="max-w-7xl flex-1 mx-auto px-4 pt-16 flex flex-col gap-20">
      <section className="space-y-6 md:space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          About {brand.name}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {brand.description}
        </p>
        <Button asChild>
          <a href="/signup">Join the Community</a>
        </Button>
      </section>

      {/* Mission Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Explore</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Travel virtually around the globe through interactive challenges
              and games. Experience locations you’ve never seen before.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learn</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Gain knowledge about countries, cultures, and geography with every
              challenge you complete.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connect</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Join a community of explorers. Share your progress, compete in
              challenges, and make learning social.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Team / Call-to-Action */}
      <section className="space-y-6 md:space-y-8 max-w-3xl">
        <h2 className="text-3xl font-semibold">Meet the Team</h2>
        <p className="text-muted-foreground">
          We are passionate learners and explorers building tools to help you
          see the world from your screen. Our team combines experience in
          education, game design, and web development.
        </p>
        <Button asChild>
          <a href="/contact">Contact Us</a>
        </Button>
      </section>
      <Footer />
    </div>
  );
}
