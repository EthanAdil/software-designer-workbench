# =============================================================================
# 生成站点 favicon（零外部依赖，仅用 Windows 自带的 System.Drawing）
#   输出：<root>/favicon.ico、<root>/assets/img/favicon-*.png、favicon.svg
#   风格取自 assets/css/main.css 的 .brand-mark：135° 蓝紫渐变 + 白色字母
# 用法：powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-favicon.ps1
# =============================================================================
param(
    [string]$Root = (Split-Path $PSScriptRoot -Parent)
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$imgDir = Join-Path $Root 'assets\img'
if (-not (Test-Path $imgDir)) { New-Item -ItemType Directory -Path $imgDir | Out-Null }

$FontName = 'Segoe UI'
$Color1 = [System.Drawing.Color]::FromArgb(255, 0x5B, 0x78, 0xFF)
$Color2 = [System.Drawing.Color]::FromArgb(255, 0x8B, 0x5C, 0xF6)

function New-RoundedPath {
    param([single]$W, [single]$R)
    $p = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $R * 2
    $p.AddArc(0, 0, $d, $d, 180, 90)
    $p.AddArc($W - $d, 0, $d, $d, 270, 90)
    $p.AddArc($W - $d, $W - $d, $d, $d, 0, 90)
    $p.AddArc(0, $W - $d, $d, $d, 90, 90)
    $p.CloseFigure()
    return $p
}

# 绘制图标（超采样后缩到目标尺寸，保证小尺寸边缘平滑）
function New-IconBitmap {
    param(
        [int]$Size,
        [double]$LetterScale,
        [double]$CornerRatio,
        [int]$SS = 16
    )
    $S = $Size * $SS
    $bmp = New-Object System.Drawing.Bitmap $S, $S, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
    $g.Clear([System.Drawing.Color]::Transparent)

    $bg = New-RoundedPath -W ([single]$S) -R ([single]($S * $CornerRatio))
    $rect = New-Object System.Drawing.RectangleF 0, 0, $S, $S
    $angle = [single]45   # GDI+ 角度：左上 -> 右下，等价 CSS 135deg
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush -ArgumentList @($rect, $Color1, $Color2, $angle)
    $g.FillPath($brush, $bg)

    $family = New-Object System.Drawing.FontFamily $FontName
    $glyph = New-Object System.Drawing.Drawing2D.GraphicsPath
    $em = [single]($S * $LetterScale)
    $glyph.AddString('S', $family, [int][System.Drawing.FontStyle]::Bold, $em, (New-Object System.Drawing.PointF 0, 0), [System.Drawing.StringFormat]::GenericDefault)
    $b = $glyph.GetBounds()
    $m = New-Object System.Drawing.Drawing2D.Matrix
    $m.Translate((($S / 2) - ($b.X + $b.Width / 2)), (($S / 2) - ($b.Y + $b.Height / 2)))
    $glyph.Transform($m)
    $g.FillPath([System.Drawing.Brushes]::White, $glyph)

    $m.Dispose(); $glyph.Dispose(); $family.Dispose(); $bg.Dispose(); $brush.Dispose(); $g.Dispose()

    $small = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g2 = [System.Drawing.Graphics]::FromImage($small)
    $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g2.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g2.DrawImage($bmp, (New-Object System.Drawing.Rectangle 0, 0, $Size, $Size), 0, 0, $S, $S, [System.Drawing.GraphicsUnit]::Pixel)
    $g2.Dispose(); $bmp.Dispose()
    return $small
}

# 尺寸与字重策略：16px 略放大字母以保住辨识度
function Get-LetterScale { param([int]$Size) if ($Size -le 16) { return 0.64 } elseif ($Size -le 32) { return 0.60 } else { return 0.56 } }
function Get-CornerRatio { param([int]$Size) if ($Size -le 16) { return 0.24 } else { return 0.26 } }

function Save-Png {
    param([System.Drawing.Bitmap]$Bitmap, [string]$Path)
    $Bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
}

# --- 1. PNG ------------------------------------------------------------------
$pngTargets = @(
    @{ Size = 16;  Name = 'favicon-16x16.png' },
    @{ Size = 32;  Name = 'favicon-32x32.png' },
    @{ Size = 48;  Name = 'favicon-48x48.png' },
    @{ Size = 180; Name = 'apple-touch-icon.png' }
)
$cache = @{}
foreach ($t in $pngTargets) {
    $icon = New-IconBitmap -Size $t.Size -LetterScale (Get-LetterScale $t.Size) -CornerRatio (Get-CornerRatio $t.Size)
    Save-Png -Bitmap $icon -Path (Join-Path $imgDir $t.Name)
    $cache[$t.Size] = $icon
    Write-Output ("PNG  {0}  {1}x{1}" -f $t.Name, $t.Size)
}

# --- 2. ICO（16/32/48 用未压缩 DIB，256 用 PNG，兼容性最好） ------------------
function Get-DibBytes {
    param([System.Drawing.Bitmap]$Bitmap)
    $w = $Bitmap.Width
    $h = $Bitmap.Height
    $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $data = $Bitmap.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $stride = [math]::Abs($data.Stride)
    $buf = New-Object byte[] ($stride * $h)
    [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $buf, 0, $buf.Length)
    $Bitmap.UnlockBits($data)

    $ms = New-Object System.IO.MemoryStream
    $bw = New-Object System.IO.BinaryWriter $ms
    # BITMAPINFOHEADER（biHeight = 2h，含 AND 掩码）
    $bw.Write([int]40); $bw.Write([int]$w); $bw.Write([int]($h * 2))
    $bw.Write([int16]1); $bw.Write([int16]32)
    $bw.Write([int]0); $bw.Write([int]0); $bw.Write([int]0); $bw.Write([int]0); $bw.Write([int]0); $bw.Write([int]0)
    # 像素：BGRA，自底向上
    for ($y = $h - 1; $y -ge 0; $y--) {
        $off = $y * $stride
        for ($x = 0; $x -lt $w; $x++) {
            $i = $off + $x * 4
            $bw.Write($buf[$i]); $bw.Write($buf[$i + 1]); $bw.Write($buf[$i + 2]); $bw.Write($buf[$i + 3])
        }
    }
    # AND 掩码：1bpp，每行按 4 字节对齐，全 0
    $maskRow = [int]([math]::Ceiling($w / 32.0) * 4)
    $mask = New-Object byte[] ($maskRow * $h)
    $bw.Write($mask)
    $bw.Flush()
    $out = $ms.ToArray()
    $bw.Dispose(); $ms.Dispose()
    return ,$out   # 逗号前缀：避免 PowerShell 把 byte[] 展开成 object[]
}

$pngBytes = @{}
foreach ($size in @(16, 32, 48)) {
    $ms = New-Object System.IO.MemoryStream
    $cache[$size].Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $pngBytes[$size] = $ms.ToArray()
    $ms.Dispose()
}

$icoSizes = @(16, 32, 48, 256)
$entries = @()
foreach ($size in $icoSizes) {
    if ($size -eq 256) {
        $big = New-IconBitmap -Size 256 -LetterScale (Get-LetterScale 256) -CornerRatio (Get-CornerRatio 256)
        $ms = New-Object System.IO.MemoryStream
        $big.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
        [byte[]]$bytes = $ms.ToArray()
        $ms.Dispose(); $big.Dispose()
    } else {
        [byte[]]$bytes = Get-DibBytes -Bitmap $cache[$size]
    }
    $entries += @{ Size = $size; Bytes = $bytes }
}

$icoPath = Join-Path $Root 'favicon.ico'
$fs = [System.IO.File]::Create($icoPath)
$bw = New-Object System.IO.BinaryWriter $fs
$bw.Write([int16]0); $bw.Write([int16]1); $bw.Write([int16]$entries.Count)
$offset = 6 + 16 * $entries.Count
foreach ($e in $entries) {
    $dim = if ($e.Size -ge 256) { 0 } else { $e.Size }
    $bw.Write([byte]$dim); $bw.Write([byte]$dim); $bw.Write([byte]0); $bw.Write([byte]0)
    $bw.Write([int16]1); $bw.Write([int16]32)
    $bw.Write([int]$e.Bytes.Length); $bw.Write([int]$offset)
    $offset += $e.Bytes.Length
}
foreach ($e in $entries) { $bw.Write($e.Bytes) }
$bw.Flush(); $bw.Dispose(); $fs.Dispose()
Write-Output ("ICO  favicon.ico  " + (($icoSizes | ForEach-Object { "${_}x$_" }) -join ', '))

# --- 3. SVG（字形转为路径，避免依赖字体） ------------------------------------
function Format-Num { param([double]$V) return $V.ToString('0.##', [System.Globalization.CultureInfo]::InvariantCulture) }

$box = 1024.0
$family = New-Object System.Drawing.FontFamily $FontName
$p = New-Object System.Drawing.Drawing2D.GraphicsPath
$p.AddString('S', $family, [int][System.Drawing.FontStyle]::Bold, ([single]($box * (Get-LetterScale 256))), (New-Object System.Drawing.PointF 0, 0), [System.Drawing.StringFormat]::GenericDefault)
$b = $p.GetBounds()
$mm = New-Object System.Drawing.Drawing2D.Matrix
$mm.Translate((($box / 2) - ($b.X + $b.Width / 2)), (($box / 2) - ($b.Y + $b.Height / 2)))
$p.Transform($mm)
$mm.Dispose(); $family.Dispose()

$scale = 64.0 / $box
$pts = $p.PathPoints
$types = $p.PathTypes
$sb = New-Object System.Text.StringBuilder
$i = 0
while ($i -lt $pts.Count) {
    $t = $types[$i] -band 0x07
    $close = ($types[$i] -band 0x80) -ne 0
    if ($t -eq 0) {
        [void]$sb.Append('M' + (Format-Num ($pts[$i].X * $scale)) + ' ' + (Format-Num ($pts[$i].Y * $scale)))
    } elseif ($t -eq 1) {
        [void]$sb.Append('L' + (Format-Num ($pts[$i].X * $scale)) + ' ' + (Format-Num ($pts[$i].Y * $scale)))
    } elseif ($t -eq 3) {
        [void]$sb.Append('C')
        foreach ($k in 0..2) {
            $pt = $pts[$i + $k]
            [void]$sb.Append((Format-Num ($pt.X * $scale)) + ' ' + (Format-Num ($pt.Y * $scale)) + ' ')
        }
        $i += 2
    }
    if ($close) { [void]$sb.Append('Z') }
    $i++
}
$p.Dispose()
$glyphD = $sb.ToString().Trim()
if (-not $glyphD.EndsWith('Z')) { $glyphD += 'Z' }   # GDI+ 末点未必带闭合标记，显式补上
$corner = Format-Num (64 * (Get-CornerRatio 64))

$svg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="软件设计师">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5B78FF"/>
      <stop offset="1" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="$corner" ry="$corner" fill="url(#g)"/>
  <path fill="#FFFFFF" d="$glyphD"/>
</svg>
"@
$svgPath = Join-Path $imgDir 'favicon.svg'
[System.IO.File]::WriteAllText($svgPath, $svg, (New-Object System.Text.UTF8Encoding $false))
Write-Output "SVG  favicon.svg"

foreach ($k in $cache.Keys) { $cache[$k].Dispose() }
Write-Output ("DONE -> " + $Root)
