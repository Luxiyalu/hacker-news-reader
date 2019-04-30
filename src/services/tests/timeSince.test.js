import { timeSince } from '../';

function timestampAgoBySeconds(seconds) {
  const timeNow = new Date();
  const timeAgo = new Date(timeNow.getTime() - seconds * 1000);
  const timestamp = timeAgo.valueOf();

  return timestamp;
}

describe('timeSinceService', () => {
  it(`timeSince 1 second ago should return 'just now'`, () => {
    expect(timeSince(timestampAgoBySeconds(1))).toEqual('just now');
  });

  it(`timeSince 119 seconds ago should return 'just now'`, () => {
    expect(timeSince(timestampAgoBySeconds(119))).toEqual('just now');
  });

  it(`timeSince 120 seconds ago should return '2 minutes ago'`, () => {
    expect(timeSince(timestampAgoBySeconds(120))).toEqual('2 minutes ago');
  });

  it(`timeSince 60 * 60 * 2 seconds ago should return '2 hours ago'`, () => {
    expect(timeSince(timestampAgoBySeconds(60 * 60 * 2))).toEqual(
      '2 hours ago'
    );
  });

  it(`timeSince 60 * 60 * 24 * 2 seconds ago should return '2 days ago'`, () => {
    expect(timeSince(timestampAgoBySeconds(60 * 60 * 24 * 2))).toEqual(
      '2 days ago'
    );
  });

  it(`timeSince 60 * 60 * 24 * 31 * 2 seconds ago should return '2 months ago'`, () => {
    expect(timeSince(timestampAgoBySeconds(60 * 60 * 24 * 31 * 2))).toEqual(
      '2 months ago'
    );
  });

  it(`timeSince 60 * 60 * 24 * 31 * 12 * 2 seconds ago should return '2 months ago'`, () => {
    expect(
      timeSince(timestampAgoBySeconds(60 * 60 * 24 * 31 * 12 * 2))
    ).toEqual('2 years ago');
  });
});
