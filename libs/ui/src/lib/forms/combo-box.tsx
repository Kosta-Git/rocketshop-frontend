import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';
import classNames from 'classnames';

export interface ComboBoxProps<T> {
  label: string;
  query: T[];
  keyExtractor: (elem: T) => number | string;
  nameExtractor: (elem: T) => string;
  onSelected?: (elem: T) => void;
  required?: boolean;
  name: string;
}

export function ComboBox<T>(props: ComboBoxProps<T>) {
  const { label, name, required = true, query, keyExtractor, nameExtractor, onSelected } = props;

  const [elements, setElements] = useState<T[]>(query);
  const [userQuery, setUserQuery] = useState<string>('');
  const [selected, setSelected] = useState<T | undefined>(undefined);

  const onChange = (e: any) => {
    setSelected(e as T);
    if(onSelected) {
      onSelected(e);
    }
  };

  const filteredElements =
    userQuery === ''
      ? elements
      : elements.filter((elem) => {
          return nameExtractor(elem)
            .toLowerCase()
            .includes(userQuery.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={onChange}
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        {label}{required ? '*' : ''}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          name={name}
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => { setUserQuery(event.target.value);}}
          displayValue={(elem: T) => (elem ? nameExtractor(elem) : '')}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredElements.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredElements.map((elem: T) => (
              <Combobox.Option
                key={keyExtractor(elem)}
                value={elem}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold'
                      )}
                    >
                      {nameExtractor(elem)}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
