import { PropsWithChildren } from 'react';

interface PageContentProps {
  title: string;
}

export const PageContent = (props: PropsWithChildren<PageContentProps>) => {
  const { title } = props;

  return (
      <div className="py-6">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            {props.children}
          </div>
        </div>
      </div>
  );
};
