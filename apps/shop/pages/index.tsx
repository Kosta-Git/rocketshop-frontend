import { Button, PageContent, ToggleInput } from '@rocketshop-monorepo/ui';
import { useState } from 'react';
import { useSession } from '../hooks/ory';

export function Index() {
  const [enabled, setEnabled] = useState(false);
  const { session } = useSession();

  console.log(session)
  return (
    <PageContent title={'Dashboard'}>
      <p>
        Hi {session?.identity?.traits?.email?? ""}
      </p>
      <ToggleInput
        enabled={enabled}
        onChange={(checked) => setEnabled(checked)}
        labelPosition="right"
        name={''}
      >
        <span className="text-sm font-medium text-gray-900">
          This is a test{' '}
        </span>
        <span className="text-sm text-gray-500">(Yay)</span>
      </ToggleInput>
      <Button size="lg" className="mx-4 my-4" style="primary">
        test
      </Button>
      <Button size="lg" className="mx-4 my-4" style="secondary">
        test
      </Button>
      <Button size="lg" className="mx-4 my-4" style="white">
        test
      </Button>
    </PageContent>
  );
}

export default Index;
