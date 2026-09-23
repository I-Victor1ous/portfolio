$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root ".certs"
$outFile = Join-Path $outDir "extra.pem"

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$sb = New-Object System.Text.StringBuilder
foreach ($store in @(
  "Cert:\LocalMachine\Root",
  "Cert:\CurrentUser\Root",
  "Cert:\LocalMachine\CA",
  "Cert:\CurrentUser\CA"
)) {
  if (-not (Test-Path $store)) { continue }
  Get-ChildItem $store | ForEach-Object {
    try {
      $bytes = $_.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert)
      $b64 = [Convert]::ToBase64String($bytes, [Base64FormattingOptions]::InsertLineBreaks)
      [void]$sb.AppendLine("-----BEGIN CERTIFICATE-----")
      [void]$sb.AppendLine($b64)
      [void]$sb.AppendLine("-----END CERTIFICATE-----")
    } catch {}
  }
}

Set-Content -Path $outFile -Value $sb.ToString() -Encoding ascii
Write-Output "Synced Windows trust store to $outFile"
