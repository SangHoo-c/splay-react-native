import { gql } from 'apollo-boost'

export const VERSION_CHECK = gql`

    query{
        appConfig{
            iOSVersion
            aOSVersion
        }
    }
`

export const REGISTER_ANONYMOUS_USER = gql`

    mutation{
        registerAnonymousUser{
            me{
              email
            }
            token
          }
    }
`

