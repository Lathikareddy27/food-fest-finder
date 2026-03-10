import { motion } from 'framer-motion';

interface CategoryChipProps {
  icon: string;
  name: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryChip = ({ icon, name, count, isActive = false, onClick }: CategoryChipProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-200 whitespace-nowrap ${
      isActive
        ? 'gradient-warm text-primary-foreground border-transparent shadow-lg'
        : 'bg-card border-border hover:border-primary/30 hover:shadow-md'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <div className="text-left">
      <p className={`text-sm font-semibold ${isActive ? '' : ''}`}>{name}</p>
      <p className={`text-[10px] ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{count} meetups</p>
    </div>
  </motion.button>
);

export default CategoryChip;
