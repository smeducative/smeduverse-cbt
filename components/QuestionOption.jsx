import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const options = [
  {
    name: 'Startup',
  },
  {
    name: 'Business',
  },
  {
    name: 'Enterprise',
  },
  {
    name: 'Enterprise <b>Special</b> lorem ipsum doro sit amet consectetur adipisicing elit. Quisquam, quidem.',
  },
]

export default function QuestionOption() {
  const [selected, setSelected] = useState('')

  return (
    <div className="w-full py-5">
      <div className="w-full mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Pilihan Jawaban</RadioGroup.Label>
          <div className="space-y-2">
            {options.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                      : ''
                  }
                  ${
                    checked ? 'bg-green-600 text-white' : 'bg-white'
                  }
                    relative border border-lightBlue-100 rounded-lg px-3 py-2 cursor-pointer flex focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center space-x-2 w-full">
                        {checked ? (
                        <div className="flex text-white justify-start">
                          <CheckIcon className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="flex justify-start">
                          <span className="w-4 h-4 bg-gray-200 rounded-full"></span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                            dangerouslySetInnerHTML={{ __html: option.name }}
                          />
                        </div>
                      </div>
                      
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
