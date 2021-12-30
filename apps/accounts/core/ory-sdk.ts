import { Configuration, V0alpha2Api } from '@ory/kratos-client';

export default new V0alpha2Api(new Configuration({
  basePath: "/api/.ory",
  accessToken: process.env.ORY_ACCESS_TOKEN
}));
