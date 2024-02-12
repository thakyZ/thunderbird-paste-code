Param()

Remove-Item -Path "paste-code.xpi" -ErrorAction SilentlyContinue

Compress-Archive -DestinationPath "paste-code.xpi" -Path @("manifest.json", "background.html", "background.js", "js")
