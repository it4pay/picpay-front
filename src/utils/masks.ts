export const cpfOrCnpjMask = [

      {
        mask: "000.000.000-00",
        type: "CPF"
      },
      {
        mask: "00.000.000/0000-00",
        type: "CNPJ"
      }

  //   dispatch: (appended: any, dynamicMasked: { compiledMasks: any[]; value: any; }) => {
  //     const cpfMask = dynamicMasked.compiledMasks.find(
  //       ({type}) => type === "CPF"
  //     );
  //
  //     const cnpjMask = dynamicMasked.compiledMasks.find(
  //       ({type}) => type === "CNPJ"
  //     );
  //
  //     if (`${dynamicMasked.value}${appended}`.length > cpfMask.mask.length) {
  //       return cnpjMask;
  //     }
  //
  //     return cpfMask;
  //   }
  // }
];

export const phoneMask = [
  {
    mask: [
      {
        mask: "(00) 0000-0000",
      },
      {
        mask: "(00) 00000-0000",
      }
    ]
  }
  ,
]

export const currencyMask = [
  {
    mask: ""
  },
  {
    mask: "R$ num{,}cents",
    blocks: {
      num: {
        mask: Number,
        signed: true,
        thousandsSeparator: ".",
        radix: ',',
        mapToRadix: ['.'],
        scale: 0
      },
      cents: {
        mask: "00",
        normalizeZeros: true,
        padFractionalZeros: true
      }
    }
  }
]
