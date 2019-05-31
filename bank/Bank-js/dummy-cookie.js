$.cookie = function(key, value)
{
    if (value === undefined)
    {
        if (key === 'authorization')
        {
            // dummy authorization cookie
            return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2VmOTdlMjVjMzBjZDAwMTM1MmViODEiLCJ1c2VybmFtZSI6IjIzMzMzIiwiX192IjowLCJpYXQiOjE1NTkyMTg4NTUsImV4cCI6MTU1OTM5MTY1NX0.d0KbiBf6twpp8Qk0C7WHRRNgkC3ySC25WXJojwIK0I0';
        }
        else if (key === 'username')
        {
            return '23333';
        }
    }
    else
    {
        console.log('[Dummy Cookie] set ' + key + ' = ' + value)
    }
}

$.removeCookie = function (key) {
    console.log("[Dummy Cookie] remove " + key);
}