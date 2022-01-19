import { UiNode, UiNodeTextAttributes } from '@ory/kratos-client';
import { UiText } from '@ory/kratos-client';

interface Props {
  node: UiNode;
  attributes: UiNodeTextAttributes;
}

const Content = ({ node, attributes }: Props) => {
  switch (attributes.text.id) {
    case 1050015:
      return (
        <div
          className="container-fluid"
          data-testid={`node/text/${attributes.id}/text`}
        >
          <div className="row">
            {(attributes.text.context as any).secrets.map(
              (text: UiText, k: number) => (
                <div
                  key={k}
                  data-testid={`node/text/${attributes.id}/lookup_secret`}
                  className="col-xs-3"
                >
                  {/* Used lookup_secret has ID 1050014 */}
                  <code>{text.id === 1050014 ? 'Used' : text.text}</code>
                </div>
              )
            )}
          </div>
        </div>
      );
  }

  return (
    <div data-testid={`node/text/${attributes.id}/text`}>
      <p>{attributes.text.text}</p>
    </div>
  );
};

export const NodeText = ({ node, attributes }: Props) => {
  return (
    <>
      <p data-testid={`node/text/${attributes.id}/label`}>
        {node.meta?.label?.text}
      </p>
      <Content node={node} attributes={attributes} />
    </>
  );
};
