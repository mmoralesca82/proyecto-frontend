const products = [
  {
    id: 1,
    name: 'Monitor'
  },
  {
    id: 2,
    name: 'Laptop'
  },
  {
    id: 3,
    name: 'Headphones'
  }
]

export async function GET(request) {
  console.log(request)
  return Response.json({
    mensaje: 'Listado de productos',
    data: products
  })
}

export async function POST(request) {
  const body = await request.json()

  return Response.json({
    message: 'Producto creado',
    data: body
  })
}