/**
 * App image model
 *
 * @class AppImage
 * @property id
 * @property tags
 * @property description
 * @property date
 * @property location
 * @property comments
 * @property imageSource - saving image completely to the firebase db, as a string; its ugly I know.
 */
export class AppImage {

  constructor(public id: number, public tags: any[], public description: string, public date: any, public location: any, public comments: string[], public imageSource: string) {
  }

}
