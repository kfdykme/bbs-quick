import * as Cli from 'knict-cli'


export class KnictCliService {

    @Cli.CliMethod.Input()
    login(@Cli.CliMethod.Str('username') username: string, @Cli.CliMethod.Password('password') password: string): any {
        return {
            username: '',
            password: ''
        }
    }
}



const knictCliService = Cli.Knict.builder(new Cli.CliClientBuilder())
    .create(new KnictCliService())
export {
    knictCliService
}