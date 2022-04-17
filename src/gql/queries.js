import { gql } from '@apollo/client'

export const GET_PRODUCT_BY_CATEGORY = gql`
  query ($input: String!) {
    category(input: { title: $input }) {
      name
      products {
        name
        id
        inStock
        gallery
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`

export const GET_PRODUCT_QUERY = gql`
  query ($id: String!) {
    product(id: $id) {
      name
      id
      inStock
      gallery
      description
      attributes {
        name
        type
        items {
          displayValue
          value
        }
      }
      brand
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`

export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`

export const GET_CATEGORIES_NAME = gql`
  query {
    categories {
      name
    }
  }
`
