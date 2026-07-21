# Installation Guides
Install the tools you need before starting the workshop.

## Prerequisites

Before the main setup, make sure you have these installed:

**Node.js (LTS)** — required for the UiPath CLI and the React app build.

1. Download the LTS version from **[nodejs.org](https://nodejs.org)**
2. Verify with `node --version` and `npm --version`

!!! tip "npm version must be 11.x.x"
    If `npm --version` returns a different version, upgrade it:

    === "Windows"
        ```bash
        npm install --global npm@11
        ```

    === "Mac"
        ```bash
        npm install -g npm@11
        ```

**Python 3.10+** — required for the coded underwriting agent.

1. Download from **[python.org/downloads](https://www.python.org/downloads/)** — on Windows, check **Add Python to PATH** during install
2. Verify with `python --version` or `python3 --version`

**.NET SDK 8.0** — required to build and run the UiPath Studio project.

1. Download from **[dotnet.microsoft.com/download/dotnet/8.0](https://dotnet.microsoft.com/download/dotnet/8.0)**
2. Verify with `dotnet --list-sdks` — you should see `8.x.x` in the output

!!! tip "Windows — make sure .NET is on your PATH"
    If `dotnet` is not recognised after install, add it to the PATH manually in PowerShell:
    ```bash
    $env:Path = "C:\Program Files\dotnet;$env:Path"
    dotnet --list-sdks
    ```

**UiPath Studio** — required to open, run, and debug the generated XAML workflow.

1. Download from **[uipath.com/start-trial](https://www.uipath.com/start-trial)**
2. Sign in with your UiPath account and verify Studio launches

**Git** — required for the UiPath skills marketplace. Try Method 1 first; if it doesn't work, use Method 2.

=== "Method 1: winget (quickest)"

    1. Open a Command Prompt and run:
       ```bash
       winget install --id Git.Git -e --source winget
       ```
    2. If prompted to accept terms, type `Y` and press Enter.
    3. Wait for "Successfully installed", then close the window.

=== "Method 2: Download the installer"

    1. Go to **[git-scm.com/download/win](https://git-scm.com/download/win)** — the 64-bit installer should download automatically.
    2. Run the downloaded file (e.g. `Git-2.xx.x-64-bit.exe`). Click Yes if Windows asks for admin permission.
    3. Click through the installer accepting all defaults. On the **"Adjusting your PATH environment"** screen, make sure the middle option is selected: *"Git from the command line and also from 3rd-party software"* — this is the default.
    4. Click Finish when done.

!!! warning "Required for both methods"
    PATH changes only take effect in new windows. Close every open terminal, then open a fresh Command Prompt and verify:
    ```bash
    git --version
    ```
    You should see something like `git version 2.45.1.windows.1`.

## Install a Coding Agent

Pick one — or install both:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# Codex CLI (OpenAI)
npm install -g @openai/codex
```

Verify: `claude --version` or `codex --version`

!!! tip "Claude Code installation error?"
    If the install fails with a scripts permission error, run:
    ```bash
    npm config set allow-scripts=@anthropic-ai/claude-code --location=user
    ```
    Then run the install command again:
    ```bash
    npm install -g @anthropic-ai/claude-code
    ```

