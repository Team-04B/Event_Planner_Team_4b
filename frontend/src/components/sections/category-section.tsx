import {
  Briefcase,
  GraduationCap,
  Users,
  Building2,
  Heart,
  Trophy,
  Cpu,
  BarChart3,
  Handshake,
  User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link";
const EventCategorySection=()=> {
  const eventCategories = [
    { name: "Professional", icon: <Briefcase className="h-6 w-6" /> },
    { name: "Educational", icon: <GraduationCap className="h-6 w-6" /> },
    { name: "Social", icon: <Users className="h-6 w-6" /> },
    { name: "Business", icon: <Building2 className="h-6 w-6" /> },
    { name: "Health", icon: <Heart className="h-6 w-6" /> },
    { name: "Sports", icon: <Trophy className="h-6 w-6" /> },
    { name: "Tech", icon: <Cpu className="h-6 w-6" /> },
    { name: "Sales", icon: <BarChart3 className="h-6 w-6" /> },
    { name: "Community", icon: <Handshake className="h-6 w-6" /> },
    { name: "Personal", icon: <User className="h-6 w-6" /> },
  ]

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Browse Events by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover events that match your interests and preferences
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {eventCategories.map((category) => (
            <Link href={`/events/category/${category.name.toLowerCase()}`} key={category.name} className="block">
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">{category.icon}</div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


export default EventCategorySection