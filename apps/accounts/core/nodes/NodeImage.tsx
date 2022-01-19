import { UiNode, UiNodeImageAttributes } from '@ory/kratos-client'
import Image from "next/image";

interface Props {
  node: UiNode
  attributes: UiNodeImageAttributes
}

export const NodeImage = ({ node, attributes }: Props) => {
  return (
    <Image
      data-testid={`node/image/${attributes.id}`}
      src={attributes.src}
      alt={node.meta.label?.text}
      width={attributes.width}
      height={attributes.height}
    />
  )
}
