import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query Tasks(
    $pageSize: Int
    $priority: String
    $page: Int
    $executionLocation: String
    $searchText: String
    $executionDate: String
  ) {
    tasks(
      pageSize: $pageSize
      priority: $priority
      page: $page
      executionLocation: $executionLocation
      searchText: $searchText
      executionDate: $executionDate
    ) {
      pagination {
        page
        perPage
        totalItems
      }
      tasks {
        attachments
        description
        executionDate
        executionLocation
        id
        insertedAt
        name
        status
        priority
        updatedAt
        files {
          filename
          url
        }
      }
    }
  }
`;