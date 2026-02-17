# Glassmorphism UI Components

This directory contains glassmorphism-styled UI components for the portfolio redesign.

## Components

### GlassCard
A standard frosted glass card with blur and translucency effects.

**Usage:**
```tsx
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui';

<GlassCard variant="elevated" interactive>
  <GlassCardHeader>
    <GlassCardTitle>Card Title</GlassCardTitle>
  </GlassCardHeader>
  <GlassCardContent>
    Card content goes here
  </GlassCardContent>
</GlassCard>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'flat'
- `interactive`: boolean - enables hover effects
- `animateOnView`: boolean - animates when entering viewport
- `blur`: number - backdrop blur in pixels (default: 10)
- `opacity`: number - background opacity 0-1 (default: 0.1)
- `borderOpacity`: number - border opacity 0-1 (default: 0.2)
- `shadowIntensity`: 'low' | 'medium' | 'high'

### GlassPanel
Larger panel for section containers with glassmorphism effects.

**Usage:**
```tsx
import { GlassPanel } from '@/components/ui';

<GlassPanel variant="bordered" shadowIntensity="medium">
  <h2>Section Title</h2>
  <p>Section content...</p>
</GlassPanel>
```

**Props:**
- `variant`: 'default' | 'bordered' | 'subtle'
- `blur`: number - backdrop blur in pixels (default: 12)
- `opacity`: number - background opacity 0-1 (default: 0.08)
- `borderOpacity`: number - border opacity 0-1 (default: 0.15)
- `shadowIntensity`: 'low' | 'medium' | 'high'

### GlassButton
Interactive button with glassmorphism effects and hover/active/focus states.

**Usage:**
```tsx
import { GlassButton } from '@/components/ui';

<GlassButton 
  variant="primary" 
  size="lg"
  onClick={() => console.log('clicked')}
>
  Click Me
</GlassButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `blur`: number - backdrop blur in pixels (default: 10)
- `opacity`: number - background opacity 0-1 (default: 0.15)
- `borderOpacity`: number - border opacity 0-1 (default: 0.3)
- `shadowIntensity`: 'low' | 'medium' | 'high'

**Interactive States:**
- Hover: Increases background opacity and shadow
- Active: Scales down slightly (0.98)
- Focus: Shows focus ring
- Disabled: Reduces opacity and disables pointer events

### GlassModal
Modal overlay with glassmorphism backdrop and content.

**Usage:**
```tsx
import { 
  GlassModal, 
  GlassModalHeader, 
  GlassModalTitle, 
  GlassModalContent,
  GlassModalFooter 
} from '@/components/ui';
import { GlassButton } from '@/components/ui';

const [isOpen, setIsOpen] = useState(false);

<GlassModal 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  size="lg"
  closeOnBackdropClick
  closeOnEscape
>
  <GlassModalHeader>
    <GlassModalTitle>Modal Title</GlassModalTitle>
  </GlassModalHeader>
  <GlassModalContent>
    Modal content goes here
  </GlassModalContent>
  <GlassModalFooter>
    <GlassButton onClick={() => setIsOpen(false)}>Close</GlassButton>
  </GlassModalFooter>
</GlassModal>
```

**Props:**
- `open`: boolean - controls modal visibility
- `onClose`: () => void - callback when modal should close
- `closeOnBackdropClick`: boolean - close when clicking backdrop (default: true)
- `closeOnEscape`: boolean - close when pressing Escape key (default: true)
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `blur`: number - backdrop blur in pixels (default: 16)
- `opacity`: number - background opacity 0-1 (default: 0.1)
- `borderOpacity`: number - border opacity 0-1 (default: 0.2)
- `shadowIntensity`: 'low' | 'medium' | 'high'

**Features:**
- Glassmorphism backdrop with blur effect
- Body scroll lock when open
- Keyboard navigation (Escape to close)
- Click outside to close
- Entrance animations
- Accessible (role="dialog", aria-modal)

## Browser Support

All components include fallback styles for browsers that don't support `backdrop-filter`:
- Modern browsers: Glassmorphism effects with backdrop blur
- Older browsers: Higher opacity solid backgrounds (0.9 instead of 0.1)

## Testing

All components have comprehensive unit tests covering:
- Basic rendering
- Glassmorphism styles
- Variant support
- Interactive states
- Fallback styles
- Edge cases

Run tests:
```bash
npm test glass-card.test.tsx
npm test glass-panel.test.tsx
npm test glass-button.test.tsx
npm test glass-modal.test.tsx
```

## Requirements

These components satisfy requirements 2.1, 2.2, and 2.3 from the portfolio-redesign spec:
- 2.1: Frosted glass effects using backdrop-filter blur
- 2.2: Translucent backgrounds with appropriate opacity levels
- 2.3: Visual depth through layering and shadow effects
