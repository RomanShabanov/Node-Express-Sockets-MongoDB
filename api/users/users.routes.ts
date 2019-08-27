import User from "./users.model";

export default function(router: any) {
  router.get("/get", User);
}
