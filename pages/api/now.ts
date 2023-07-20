export default async function handler(request: any, response: any) {
    let now = new Date;
    if (request.method == "GET") {
      return response.status(200).json(now.toLocaleString());
    }
  }