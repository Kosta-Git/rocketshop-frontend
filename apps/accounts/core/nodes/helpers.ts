import { UiNode, UiNodeInputAttributes } from '@ory/kratos-client'
import { FormEvent } from 'react'

export type ValueSetter = (
  value: string | number | boolean | undefined
) => Promise<void>

export type FormDispatcher = (e: MouseEvent | FormEvent) => Promise<void | boolean>

export interface NodeInputProps {
  node: UiNode
  attributes: UiNodeInputAttributes
  value: any
  disabled: boolean
  dispatchSubmit: FormDispatcher
  setValue: ValueSetter
}
