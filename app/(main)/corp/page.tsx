import { Corp } from '@/components/corp';
import { OrgansProvider } from '@/lib/providers/organ-provider';

export default function Page() {
  return (
    <OrgansProvider>
      <Corp />
    </OrgansProvider>
  );
}
