"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "3 Resume downloads per month",
      "5 Basic templates",
      "PDF export",
      "Basic AI suggestions",
      "Email support",
    ],
    notIncluded: [
      "Premium templates",
      "Unlimited downloads",
      "Cover letter builder",
      "Priority support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "Best for active job seekers",
    features: [
      "Unlimited resume downloads",
      "100+ Premium templates",
      "PDF, DOCX, & TXT export",
      "Advanced AI suggestions",
      "Cover letter builder",
      "Resume analytics",
      "Priority email support",
      "Remove watermark",
    ],
    notIncluded: [],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For career coaches & teams",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team collaboration",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Phone support",
      "Custom templates",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I try Pro features before subscribing?",
    answer: "Yes! We offer a 7-day free trial of Pro features. No credit card required to start.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.",
  },
  {
    question: "Is there a student discount?",
    answer: "Yes! Students get 50% off Pro plans. Verify your student status to unlock the discount.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Simple Pricing
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose the Plan That{" "}
              <span className="text-blue-600">Fits Your Needs</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start for free and upgrade when you need more features. No hidden fees, cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/25 scale-105"
                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-white" : ""}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : ""}`}>
                    {plan.price}
                  </span>
                  <span className={`${plan.popular ? "text-blue-100" : "text-gray-500"}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 ${plan.popular ? "text-blue-200" : "text-green-500"}`} />
                      <span className={`text-sm ${plan.popular ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 opacity-50">
                      <span className="w-5 h-5 shrink-0 text-center">-</span>
                      <span className={`text-sm line-through ${plan.popular ? "text-blue-200" : "text-gray-400"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/editor"
                  className={`block w-full py-3 rounded-xl text-center font-medium transition-all ${
                    plan.popular
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our team is here to help. Contact us anytime.
            </p>
            <a
              href="mailto:support@resumeai.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
