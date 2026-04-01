"use client";

import "./FAQSection.css";

interface FAQSectionProps {
  onBack: () => void;
}

const faqs = [
  {
    q: "What is DolRise?",
    a: "DolRise is an emotional-first social space designed for reflection, calm expression, and personal growth."
  },
  {
    q: "How is DolRise different from other social media?",
    a: "DolRise focuses on emotions and understanding, not likes, followers, or pressure."
  },
  {
    q: "What is Feel?",
    a: "Feel lets you express how a post made you feel, without words or social pressure."
  },
  {
    q: "Is Feel the same as a Like?",
    a: "No. Feel is about emotional understanding, not popularity."
  },
  {
    q: "What is Reflect?",
    a: "Reflect allows you to respond thoughtfully using text or voice."
  },
  {
    q: "What is ReEcho?",
    a: "ReEcho lets you share a post respectfully, without changing its meaning."
  },
  {
    q: "What is Your Flow?",
    a: "Your Flow shows content based on your current emotional state, not trends."
  },
  {
    q: "What is Space tab?",
    a: "Space is for text-based posts and stories only."
  },
  {
    q: "What are Moments?",
    a: "Moments show photos and videos in a calm, intentional way."
  },
  {
    q: "What are Notes?",
    a: "Notes are for voice messages and audio reflections."
  },
  {
    q: "Is my content private?",
    a: "Yes. You control who sees your posts."
  },
  {
    q: "Does DolRise sell my data?",
    a: "No. DolRise does not sell user data."
  },
  {
    q: "Who is LUMi?",
    a: "LUMi is DolRise’s AI care guide, designed to support, not judge."
  },
  {
    q: "How do I contact human support?",
    a: "Use the Care Team section in Support Center."
  },
  {
    q: "How long does support take to reply?",
    a: "Support replies within 48 working hours."
  }
,
{
  q: "Is DolRise free to use?",
  a: "Yes. DolRise is free to use, with optional premium features in the future."
},
{
  q: "Do I need followers to use DolRise?",
  a: "No. DolRise does not depend on followers or popularity."
},
{
  q: "Can I post without choosing a mood?",
  a: "Yes. Mood selection is optional, but it helps personalize your experience."
},
{
  q: "Can I change my mood after posting?",
  a: "Yes. You can update your mood if your feelings change."
},
{
  q: "What happens when I Feel a post?",
  a: "The author receives emotional feedback without public pressure."
},
{
  q: "Are Feels visible to everyone?",
  a: "Only the author sees aggregated emotional responses."
},
{
  q: "Can I Reflect anonymously?",
  a: "No. Reflection encourages thoughtful, accountable expression."
},
{
  q: "Can I delete a Reflect?",
  a: "Yes. You can delete your reflections anytime."
},
{
  q: "Can I ReEcho my own post?",
  a: "Yes. ReEcho helps resurface meaningful thoughts."
},
{
  q: "Does ReEcho change the original content?",
  a: "No. ReEcho preserves the original meaning and context."
},
{
  q: "What kind of content appears in Your Flow?",
  a: "Content aligned with your current emotional state."
},
{
  q: "Is Your Flow chronological?",
  a: "No. It is emotionally curated, not time-based."
},
{
  q: "Can I switch between tabs freely?",
  a: "Yes. You can move between Flow, Space, Moments, and Notes anytime."
},
{
  q: "What content is allowed on Space?",
  a: "Text-based thoughts, short stories, and reflections."
},
{
  q: "Are long stories allowed?",
  a: "Yes. DolRise supports meaningful long-form writing."
},
{
  q: "What formats are supported in Moments?",
  a: "Photos and videos designed for calm viewing."
},
{
  q: "Are videos autoplayed?",
  a: "No. Videos respect your attention and play intentionally."
},
{
  q: "What is the purpose of Notes?",
  a: "Notes allow voice-based emotional expression."
},
{
  q: "Can others comment on my Notes?",
  a: "Yes, through thoughtful reflections."
},
{
  q: "Is DolRise suitable for mental health support?",
  a: "DolRise is supportive, but not a replacement for professional care."
},
{
  q: "Does DolRise promote positivity only?",
  a: "No. All emotions are valid here, including difficult ones."
},
{
  q: "How does DolRise handle harmful behavior?",
  a: "Through calm moderation and human-centered review."
},
{
  q: "What happens if someone reports content?",
  a: "The content is reviewed with care and fairness."
},
{
  q: "Can I block other users?",
  a: "Yes. You control who interacts with you."
},
{
  q: "Can I hide my profile information?",
  a: "Yes. Privacy controls are available in settings."
},
{
  q: "Is my email visible to others?",
  a: "No. Your email is always private."
},
{
  q: "Can I delete my account?",
  a: "Yes. You can deactivate or delete your account anytime."
},
{
  q: "Will my data be deleted after account removal?",
  a: "Yes. According to our data and privacy policies."
},
{
  q: "Does DolRise track my activity?",
  a: "Only to improve your experience, never for selling data."
},
{
  q: "Is DolRise available worldwide?",
  a: "Yes. DolRise is designed for a global community."
},
{
  q: "What languages does DolRise support?",
  a: "English currently, with more languages planned."
},
{
  q: "How do I give feedback to DolRise?",
  a: "You can reach us through the Support Center."
},
{
  q: "What is the vision of DolRise?",
  a: "To create the world’s safest emotional social space."
},
{
  q: "Who is DolRise built for?",
  a: "For anyone seeking calm, meaning, and emotional clarity."
}
];

export default function FAQSection({ onBack }: FAQSectionProps) {
  return (
    <div className="faq-sheet">
      {/* HEADER */}
      <header className="faq-header">
        <button onClick={onBack}>← Back</button>
        <h2>Common Questions</h2>
        <p>Clear answers, without pressure.</p>
      </header>

      {/* FAQ LIST */}
      <div className="faq-body">
        {faqs.map((item, index) => (
          <div key={index} className="faq-item">
            <h4 className="faq-question-text">{item.q}</h4>
            <p className="faq-answer-text">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
