import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import React, { useState } from 'react'

const ProviderBankDetailController = () => {
    const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
    const [registrationError, setRegistrationError] = useState("");
    const [bankNameError, setBankNameError] = useState("");
    const [branchError, setBranchError] = useState("");
    const [accountError, setAccountError] = useState("");
    const registrationNumberRef = React.useRef<any>("");
    const bankNameRef = React.useRef<any>("");
    const branchRef = React.useRef<any>("");
    const accountRef = React.useRef<any>("");

    const onBlurRegistrationNumber= () => { validateRegistrationNumber(); setUserDataProvider({ ...userDataProvider, registration: registrationNumberRef.current.value }) }
    const onChangeRegistrationNumber= (value: string) => registrationNumberRef.current.value = value

    const onBlurBankName = () => { validateBankName(); setUserDataProvider({ ...userDataProvider, bank_name: bankNameRef.current.value }) }
    const onChangeBankName = (value: string) => bankNameRef.current.value = value

    const onBlurBranchType = () => { validateBranch(); setUserDataProvider({ ...userDataProvider, branch: branchRef?.current?.value }) }
    const onChangeBranchType = (value: string) => branchRef.current.value = value

    const onBlurAccount = () => { validateAccount(); setUserDataProvider({ ...userDataProvider, account: accountRef?.current?.value }) }
    const onChangeAccount = (value: string) => accountRef.current.value = value
 
    const validateRegistrationNumber = () => {
        if (!registrationNumberRef.current.value) {
          setRegistrationError("Registration is required");
        } else {
          setRegistrationError("");
        }
      };
    
      const validateBankName = () => {
        if (!bankNameRef.current.value) {
          setBankNameError("Bank is required");
        } else {
          setBankNameError("");
        }
      };
      const validateBranch = () => {
        if (!bankNameRef.current.value) {
          setBranchError("Branch is required");
        } else {
          setBranchError("");
        }
      };
      const validateAccount = () => {
        if (!bankNameRef.current.value) {
          setAccountError("Bank Account is required");
        } else {
          setAccountError("");
        }
      };
  
    return {
        bankNameRef,
        registrationNumberRef,
        branchRef,
        accountRef,
        onBlurRegistrationNumber,
        onChangeRegistrationNumber,
        onBlurBankName,
        onChangeBankName,
        onBlurBranchType,
        onChangeBranchType,
        onBlurAccount,
        onChangeAccount,
        registrationError,
        bankNameError,
        branchError,
        accountError
        
    }
}

export default ProviderBankDetailController