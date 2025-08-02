import { Tabs, TabsContent } from '@/components/ui/tabs'

import LoginForm from './_components/login-form'

const AuthenticationPage = async () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AuthenticationPage
