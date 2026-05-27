import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !session.user) {
      return new Response(
        `
        <html>
          <body>
            <script>
              window.parent.postMessage({ type: 'AUTH_ERROR', error: 'Unauthorized' }, '*');
            </script>
          </body>
        </html>
        `,
        {
          status: 401,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    const message = {
      type: 'AUTH_SUCCESS',
      jwt: session.access_token,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name || '',
      },
    };

    return new Response(
      `
      <html>
        <body>
          <script>
            window.parent.postMessage(${JSON.stringify(message)}, '*');
          </script>
        </body>
      </html>
      `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (err) {
    console.error('GET /api/auth/expo-web-success error:', err);
    return new Response(
      `
      <html>
        <body>
          <script>
            window.parent.postMessage({ type: 'AUTH_ERROR', error: 'Internal Server Error' }, '*');
          </script>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }
}
