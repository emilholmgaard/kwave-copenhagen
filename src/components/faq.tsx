'use client'

import { Container } from './container'
import { Heading, Subheading } from './text'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

const faqs = [
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: 'What do you call someone with no body and no nose?',
    answer: 'Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'Why do you never see elephants hiding in trees?',
    answer:
      "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Shipping typically takes 5-10 business days depending on your location. International orders may take longer. You will receive a tracking number once your order has been shipped.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment gateway.',
  },
  {
    question: 'Can I return or exchange items?',
    answer:
      'Yes, we offer a 30-day return policy for unused items in their original packaging. Please contact our customer support team to initiate a return or exchange.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Please check our shipping page for more details.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-black">
      <Container>
        <div className="pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <Subheading>FAQ</Subheading>
              <Heading as="h2" className="mt-2">
                Frequently asked questions
              </Heading>
              <p className="mt-4 text-base/7 text-gray-400">
                Can't find the answer you're looking for? Reach out to our{' '}
                <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  customer support
                </a>{' '}
                team.
              </p>
            </div>
            <div className="mt-10 lg:col-span-6 lg:mt-0">
              <dl className="space-y-8">
                {faqs.map((faq, index) => (
                  <div key={faq.question}>
                    <dt>
                      <button
                        onClick={() => toggleQuestion(index)}
                        className="flex w-full items-center justify-between text-left text-base/7 font-semibold text-white transition-colors hover:text-gray-300"
                      >
                        <span>{faq.question}</span>
                        {openIndex === index ? (
                          <ChevronUpIcon className="size-5 flex-shrink-0" />
                        ) : (
                          <ChevronDownIcon className="size-5 flex-shrink-0" />
                        )}
                      </button>
                    </dt>
                    {openIndex === index && (
                      <dd className="mt-3 rounded-xl bg-black/60 backdrop-blur-sm p-4 ring-1 ring-white/10">
                        <p className="text-base/7 text-gray-400">
                          {faq.answer}
                        </p>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

