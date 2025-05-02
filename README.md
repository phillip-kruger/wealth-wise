# Wealth Wise

## Setting Up Your OpenAI API Key

To run this application, you need to set your OpenAI API key as an environment variable.

### Linux & macOS (Bash/Zsh)
Open a terminal and run:

```sh
export QUARKUS_LANGCHAIN4J_OPENAI_API_KEY="your-api-key-here"
```

To make this change persistent, add the line above to your `~/.bashrc`, `~/.bash_profile`, or `~/.zshrc` file:

```sh
echo 'export QUARKUS_LANGCHAIN4J_OPENAI_API_KEY="your-api-key-here"' >> ~/.bashrc
# or for zsh users
echo 'export QUARKUS_LANGCHAIN4J_OPENAI_API_KEY="your-api-key-here"' >> ~/.zshrc
```

Then, restart your terminal or run:

```sh
source ~/.bashrc  # or source ~/.zshrc for zsh users
```

### Windows (Command Prompt)
Run the following command in Command Prompt:

```cmd
set QUARKUS_LANGCHAIN4J_OPENAI_API_KEY=your-api-key-here
```

Note: This sets the variable only for the current session.

To set it permanently, use:

```cmd
setx QUARKUS_LANGCHAIN4J_OPENAI_API_KEY "your-api-key-here"
```

### Windows (PowerShell)
Run:

```powershell
$env:QUARKUS_LANGCHAIN4J_OPENAI_API_KEY="your-api-key-here"
```

For a permanent change, add the following to your PowerShell profile:

```powershell
[System.Environment]::SetEnvironmentVariable("QUARKUS_LANGCHAIN4J_OPENAI_API_KEY", "your-api-key-here", "User")
```

After setting the variable, restart your terminal for changes to take effect.


## Running the application in dev mode

You can run your application in dev mode that enables live coding using:

```shell script
./mvnw quarkus:dev
```

> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at <http://localhost:8080/q/dev/>.

## Packaging and running the application

The application can be packaged using:

```shell script
./mvnw package
```

It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/quarkus-app/lib/` directory.

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

If you want to build an _über-jar_, execute the following command:

```shell script
./mvnw package -Dquarkus.package.jar.type=uber-jar
```

The application, packaged as an _über-jar_, is now runnable using `java -jar target/*-runner.jar`.

## Creating a native executable

You can create a native executable using:

```shell script
./mvnw package -Dnative
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using:

```shell script
./mvnw package -Dnative -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./target/financial-advisor-1.0.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult <https://quarkus.io/guides/maven-tooling>.

## Related Guides

- LangChain4j OpenAI ([guide](https://docs.quarkiverse.io/quarkus-langchain4j/dev/index.html)): Provides the basic integration with LangChain4j
- WebSockets Next ([guide](https://quarkus.io/guides/websockets-next-reference)): Implementation of the WebSocket API with enhanced efficiency and usability
- Web Bundler ([guide](https://docs.quarkiverse.io/quarkus-web-bundler/dev/)): Creating full-stack Web Apps is fast and simple with this extension. Zero config bundling for your web-app scripts (js, jsx, ts, tsx), dependencies (jquery, react, htmx, ...) and styles (css, scss, sass).

## Use Cases for Demo

### RAG-Enhanced Market Insights
**User asks:** "How should I invest $5,000?"

### Tax Advisory with Up-to-Date Information (RAG)
**User asks:** "What are the latest tax deductions?"

### Investment Portfolio Builder
**User selects:** Conservative, Balanced, or Aggressive risk level.

### History (DB)
All of the above should show in the History
