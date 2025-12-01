import { db } from '../db/index.js';
import { urlsTable } from '../models/urls.model.js';
import { nanoid } from 'nanoid';
import { and, eq } from 'drizzle-orm';

export const shortenUrl = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: 'You must be logged in to access',
      });
    }
    const body = req.body || {};
    const { url, code } = body;

    if (!url) return res.status(400).json({ error: 'Missing target url' });

    const candidate = code ?? nanoid(6);

    const [inserted] = await db
      .insert(urlsTable)
      .values({
        shortCode: candidate,
        targetUrl: url,
        userId: req.user.id,
      })
      .returning({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetUrl: urlsTable.targetUrl,
      });

    return res.status(201).json({
      message: 'Short URL created',
      data: {
        id: inserted.id,
        shortCode: inserted.shortCode,
        targetUrl: inserted.targetUrl,
      },
    });
  } catch (err) {
    console.error('Error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const shortCode = async (req, res) => {
  const code = req.params.shortCode;

  const [result] = await db.select().from(urlsTable).where(eq(urlsTable.shortCode, code));

  if (!result) {
    return res.status(404).json({
      error: 'Invalid Url',
    });
  }

  return res.redirect(result.targetUrl);
};

export const allCode = async (req, res) => {
  const code = await db.select().from(urlsTable).where(eq(urlsTable.userId, req.user.id));

  return res.json({ code });
};

export const deleteUrl = async (req, res) => {
  const id = req.params.id;

  const result = await db
    .select()
    .from(urlsTable)
    .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)));

  if (result.length === 0) {
    return res.status(404).json({ error: 'URL not found' });
  }

  await db.delete(urlsTable).where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)));

  return res.status(200).json({
    Deleted: true,
    url: result[0],
  });
};
