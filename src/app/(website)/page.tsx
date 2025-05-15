import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle, ChevronRight, Rocket, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const plans = [
    {
      name: 'Free Plan',
      description: 'Perfect for getting started',
      price: '₹0',
      features: [
        'Boost engagement with target responses',
        'Automate comment replies',
        'Basic analytics dashboard',
        'Up to 100 automated responses/month',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Smart AI Plan',
      description: 'Advanced features for power users',
      price: '₹99',
      features: [
        'All Free Plan features',
        'AI-powered response generation',
        'Advanced analytics and insights',
        'Priority customer support',
        'Custom branding options',
        'Unlimited responses',
      ],
      cta: 'Upgrade Now',
      popular: true,
    },
  ]

  const features = [
    {
      title: "AI-Powered Responses",
      description: "Our advanced AI crafts perfect replies to engage your audience",
      icon: <Sparkles className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Real-Time Analytics",
      description: "Track engagement metrics and optimize your strategy",
      icon: <Rocket className="w-6 h-6 text-purple-500" />
    },
    {
      title: "24/7 Automation",
      description: "Never miss an engagement opportunity, even while you sleep",
      icon: <Star className="w-6 h-6 text-yellow-500" />
    }
  ]

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
        
        {/* Floating dots */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.3)_0%,transparent_70%)] animate-pulse" />
        
        <div className="relative z-10">
          <div className="container px-4 py-8 mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center font-bold border border-white/20">
                  <Image src='/Slide.png' width={40} height={40} alt="Slide Logo" className="p-1" />
                </div>
                <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Slide
                </span>
              </div>
              <nav className="hidden space-x-6 text-sm font-medium text-blue-200 md:block">
                <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                <Link href="#about" className="hover:text-white transition-colors">About</Link>
              </nav>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
                <Link href="/dashboard">
                  Get Started <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Hero Content */}
            <div className="mx-auto mt-16 max-w-3xl text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400">
                Transform Your Instagram Engagement
              </h1>

              <p className="mt-6 text-lg text-blue-200/90 max-w-2xl mx-auto">
                Slide revolutionizes how you connect with your audience on Instagram. 
                Automate responses and boost engagement effortlessly, turning interactions 
                into valuable business opportunities.
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-blue-500/20"
                >
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-400 text-blue-100 hover:bg-blue-900/50 hover:text-white transition-all group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    See How It Works
                  </span>
                  <ChevronRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-60 md:h-96 w-full mt-16 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm">
              <Image
                src="/Ig-creators.png"
                alt="Instagram creators using Slide"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              Powerful Features
            </span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Supercharge Your Instagram Growth
            </h2>
            <p className="max-w-[900px] text-muted-foreground">
              Everything you need to build meaningful connections with your audience
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500 opacity-10 transition-all duration-500 group-hover:scale-150" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
              Simple Pricing
            </span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Choose Your Perfect Plan
            </h2>
            <p className="max-w-[900px] text-muted-foreground">
              Select the plan that fits your needs and start growing today
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2 md:gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col justify-between transition-all hover:shadow-lg ${plan.popular ? 'border-2 border-blue-500 relative' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
                    Most Popular
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="grid gap-4">
                  <div className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start"
                      >
                        <CheckCircle className="mt-0.5 mr-2 h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center text-sm text-muted-foreground">
            Need something custom? <Link href="#" className="text-blue-600 hover:underline">Contact us</Link> for enterprise solutions.
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Ready to Transform Your Instagram?
            </h2>
            <p className="max-w-[900px] text-blue-100">
              Join thousands of creators and businesses boosting their engagement with Slide
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-8 py-6 text-lg font-medium shadow-xl"
            >
              Start Your Free Trial <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}