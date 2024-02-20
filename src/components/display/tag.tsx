export interface TagProps {
  className?: string;
  colorScheme?: keyof typeof TagColors;
  size?: 'sm' | 'md' | 'lg';
}

const TagColors = {}
