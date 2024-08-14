# Open Upvotes 🚀

Open Upvotes is an open-source, collaborative idea management platform built with the T3 Stack. It's designed to facilitate the sharing, discussion, and voting of ideas in various contexts.


## Features 🎁

-  Create and manage boards for organizing ideas
-  Post ideas with descriptions and categorize them with labels
-  Interact with ideas through comments and upvotes
-  User authentication and authorization with NextAuth.js
-  Type-safe API routes with tRPC

## Use Cases 💡

-  **Idea Management**: Centralized platform for teams to manage, track, and discuss ideas.
-  **Product Feedback**: Collect and prioritize user feedback and feature requests.
-  **Community Engagement**: Encourage participation and idea sharing in online communities.
-  **Innovation Challenges**: Host innovation challenges or hackathons, facilitating idea submission and feedback.
-  **Academic Research**: Facilitate idea sharing and collaboration among researchers and students.
-  **Non-Profit Initiatives**: Gather ideas and suggestions from supporters or volunteers for decision-making and planning.

## Installation 🛠️

1. Clone the repository:
    ```
    git clone https://github.com/memosys/open-upvotes.git
    ```
2. Navigate to the project directory:
    ```
    cd open-upvotes
    ```
3. Setup environment variables. You will need to add the following environment variables to a `.env.local` file in your project root:
    ```dotenv
    POSTGRES_URL=your_postgres_url
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000/api/auth
    KEYP_CLIENT_ID=your_keyp_client_id
    KEYP_COOKIE_SECRET=your_keyp_cookie_secret
    NODE_ENV=development
    POSTGRES_PRISMA_URL=your_postgres_prisma_url
    ```

4. Install dependencies using Yarn:
    ```
    yarn install
    ```
5. Start the application:
    ```
    yarn start
    ```
6. Access the application at `http://localhost:3000` in your web browser.

## Contributing 🤝

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

Please ensure that your code follows the project's coding style and conventions.

## License 📄

Open Upvotes is released under the [MIT License](https://opensource.org/licenses/MIT).
