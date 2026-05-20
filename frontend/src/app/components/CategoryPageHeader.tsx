import { getCategoryDisplayName } from '../utils/categoryLabels';
import { PageHeading } from './PageHeading';

type CategoryPageHeaderProps = {
  category: string;
  sticky?: boolean;
};

export function CategoryPageHeader({ category, sticky = false }: CategoryPageHeaderProps) {
  return (
    <PageHeading
      title={getCategoryDisplayName(category)}
      sticky={sticky}
      variant="cream"
      compact
    />
  );
}
