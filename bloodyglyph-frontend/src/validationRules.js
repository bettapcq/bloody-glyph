export const validationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 30,
    message: "L'username deve contenere tra 3 e 30 caratteri",
  },

  email: {
    required: true,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    message: "Inserisci un'email valida",
  },

  password: {
    required: true,
    pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&._#\\-]).{8,}$",
    message: `La password deve:
- avere almeno 8 caratteri
- contenere una lettera maiuscola
- contenere una lettera minuscola
- contenere un numero
- contenere un simbolo`,
  },
};
