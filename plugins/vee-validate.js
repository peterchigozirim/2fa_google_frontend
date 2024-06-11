import { configure, defineRule } from 'vee-validate'
import { required, email, min, max, alpha_spaces as alphaSpaces, confirmed, numeric, image } from '@vee-validate/rules'

export default defineNuxtPlugin((nuxtApp) => {
  configure({
    generateMessage: (cxt) =>{
      const messages = {
          required: `The field is required.`,
          email: `Invaild email address.`,
          min: `The field ${cxt.field} is too short.`,
          max: `The field ${cxt.field} is too long.`,
          alpha_spaces: `The field ${cxt.field} may only contain alphabetical characters and space.`,
          confirmed: `The passwords do not match.`,
          tos: `You accept the terms of service.`,
          numeric: `The ${cxt.field} must be a number.`,
          image: `The file must be an image`
      };
      const message = messages[cxt.rule.name] ? messages[cxt.rule.name] : `The field ${cxt.field} is required.`;
      return message;
    },
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
  })

  defineRule('required', required)
  defineRule('tos', required)
  defineRule('min', min)
  defineRule('email', email)
  defineRule('max', max)
  defineRule('alpha_spaces', alphaSpaces)
  defineRule('confirmed', confirmed)
  defineRule('numeric', numeric)
  defineRule('image', image)
})