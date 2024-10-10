import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import validator from 'validator'

import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import Spacing from '@shared/Spacing'
import { FormValues } from '@models/signup'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  const [dirty, setDirty] = useState<Partial<FormValues>>({})
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  // 폼의 개수도 별로 없기에 useMemo를 통해, 실시간으로 대에터 체크 확인
  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한상태인가 = Object.keys(errors).length === 0

  // 이 함수는 바깥의 값에 의존하지 않음. Form태그에서만 있음.
  // 애가 필요로 이루어지는 값은 e만 알면되기에 UseCallback을 이용하면됨.
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    // console.log(e.target.name)
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        name="email"
        label="이메일"
        placeholder="dydals3440@gmail.com"
        value={formValues.email}
        onChange={handleFormValues}
        // 스트링으로 타이핑
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : null}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        name="password"
        label="패스워드"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : null}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        name="rePassword"
        label="패스워드 재확인"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : null}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        name="name"
        label="이름"
        placeholder="고구마"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : null}
        onBlur={handleBlur}
      />
      <FixedBottomButton
        disabled={!제출가능한상태인가}
        label="회원가입"
        onClick={() => {
          onSubmit(formValues)
        }}
      />
    </Flex>
  )
}

// errors = { email: '이메일', rePassword: '비밀번호를 확인해주세요' }
function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (!validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식을 확인해주세요!'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요.'
  } else if (!validator.equals(formValues.rePassword, formValues.password)) {
    errors.rePassword = '비밀번호를 확인해주세요!'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요.'
  }

  return errors
}

const formContainerStyles = css`
  padding: 24px;
`

export default Form
