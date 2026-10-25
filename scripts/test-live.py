#!/usr/bin/env python3
"""Run backend fixtures and the browser against a disposable DB; never uses real admin credentials."""
from pathlib import Path
import os
import sys

backend = Path(os.environ.get('LOGIERP_BACKEND', '/home/chboy/RiderProjects/LogiERP'))
front = Path(__file__).resolve().parents[1]
harness = backend / 'tests/integration.py'
sys.path.insert(0, str(harness.parent))
source = harness.read_text()
marker = '    day3.run(request, sql, token, active_reader_token)'
assert marker in source, 'Backend harness changed; review integration hook.'
hook = marker + "\n    subprocess.run(['npx', 'playwright', 'test', 'tests/live.spec.ts'], cwd=" + repr(str(front)) + ", env={**os.environ, 'LOGIERP_API_URL': BASE, 'LOGIERP_EMAIL': 'admin@test.invalid', 'LOGIERP_PASSWORD': password}, check=True)"
exec(compile(source.replace(marker, hook), str(harness), 'exec'), {'__file__': str(harness), '__name__': '__main__'})
