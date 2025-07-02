import { HTMLMotionProps, motion, TargetAndTransition, VariantLabels } from 'framer-motion';
import React from 'react';

type AnimationProps = {
  whileHover?: TargetAndTransition | VariantLabels;
  whileTap?: TargetAndTransition | VariantLabels;
};

type HighlightConfig = {
  /** The text to highlight */
  text: string;
  /**
   * Words or phrases to highlight with their styles
   * Key: The word or phrase to highlight (case insensitive)
   * Value: Tailwind classes to apply
   */
  highlights: Record<string, string>;
  /**
   * Animation configuration for highlighted text
   * @default { whileHover: { scale: 1.05 } }
   */
  animation?: AnimationProps;
  /**
   * Additional props to pass to the container element
   * @default {}
   */
  containerProps?: HTMLMotionProps<'span'>;
};

const defaultAnimation = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

/**
 * Highlights specified words or phrases in a text with custom styles and animations
 * @param config Configuration object
 * @returns JSX elements with highlighted text
 */
export function highlightText(config: HighlightConfig): React.ReactNode {
  const { text, highlights, animation = defaultAnimation, containerProps = {} } = config;

  if (!text) return null;

  // Create a regex pattern that matches any of the highlight words
  const pattern = new RegExp(
    `(${Object.keys(highlights)
      .sort((a, b) => b.length - a.length) // Sort by length to match longer phrases first
      .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|')})`,
    'gi'
  );

  // Split the text into parts, keeping the matched words
  const parts = text.split(pattern).filter(part => part !== undefined && part !== '');

  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, index) => {
        // Check if this part should be highlighted
        const highlightEntry = Object.entries(highlights).find(([word]) => 
          word.toLowerCase() === part.toLowerCase()
        );

        if (highlightEntry) {
          const [_, highlightStyle] = highlightEntry;
          return (
            <motion.span
              key={index}
              className={`${highlightStyle} inline`}  // Add inline class here
              whileHover={animation.whileHover}
              whileTap={animation.whileTap}
              {...containerProps}
            >
              {part}
            </motion.span>
          );
        }

        return <span key={index} className="inline">{part}</span>;
      })}
    </span>
  );
}

/**
 * Predefined highlight configurations for common use cases
 */
export const highlightPresets = {
  // For highlighting technical skills
  technical: {
    'innovative web solutions': 'text-cyan-400 font-semibold',
    'cutting-edge technologies': 'text-purple-400 font-semibold',
    'full-stack development': 'text-pink-400 font-semibold',
    'problem-solving skills': 'text-yellow-400 font-semibold',
    'modern web technologies': 'text-green-400 font-semibold',
    'dedicated MCA student': 'text-blue-400 font-semibold',
  },
  // For highlighting achievements
  achievements: {
    'successfully delivered': 'text-green-400 font-bold',
    'award-winning': 'text-yellow-400 font-bold',
  },
  // Add more presets as needed
} as const;
