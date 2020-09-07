function EmailChat() {
    var cht = prompt('Enter "' + curName + '" to get Email of chats of this User');
    cht = cht.trim();
    if (cht === curName) {
        emUser = curId;
        emName = curName;
        var dbb = openDatabase("itemDB", "1.0", "itemDB", 65535);
        dbb.transaction(function (transaction) {
            var sql = "SELECT * FROM items WHERE origin = '" + emUser + "' OR destination = '" + emUser + "' ORDER BY rowid";
            transaction.executeSql(sql, undefined, function (transaction, result) {
                if (result.rows.length) {
                    var eml = `
                    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
	<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width">
	<!--[if !mso]><!-->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!--<![endif]-->
	<title></title>
	<!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
	<!--<![endif]-->
	<style type="text/css">
		body {
			margin: 0;
			padding: 0;
		}

		table,
		td,
		tr {
			vertical-align: top;
			border-collapse: collapse;
		}

		* {
			line-height: inherit;
		}

		a[x-apple-data-detectors=true] {
			color: inherit !important;
			text-decoration: none !important;
		}
	</style>
	<style type="text/css" id="media-query">
		@media (max-width: 660px) {

			.block-grid,
			.col {
				min-width: 320px !important;
				max-width: 100% !important;
				display: block !important;
			}

			.block-grid {
				width: 100% !important;
			}

			.col {
				width: 100% !important;
			}

			.col>div {
				margin: 0 auto;
			}

			img.fullwidth,
			img.fullwidthOnMobile {
				max-width: 100% !important;
			}

			.no-stack .col {
				min-width: 0 !important;
				display: table-cell !important;
			}

			.no-stack.two-up .col {
				width: 50% !important;
			}

			.no-stack .col.num4 {
				width: 33% !important;
			}

			.no-stack .col.num8 {
				width: 66% !important;
			}

			.no-stack .col.num4 {
				width: 33% !important;
			}

			.no-stack .col.num3 {
				width: 25% !important;
			}

			.no-stack .col.num6 {
				width: 50% !important;
			}

			.no-stack .col.num9 {
				width: 75% !important;
			}

			.video-block {
				max-width: none !important;
			}

			.mobile_hide {
				min-height: 0px;
				max-height: 0px;
				max-width: 0px;
				display: none;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide {
				display: block !important;
				max-height: none !important;
			}
		}
	</style>
</head>

<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #ffffff;">
	<!--[if IE]><div class="ie-browser"><![endif]-->
	<table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#ffffff" valign="top">
		<tbody>
			<tr style="vertical-align: top;" valign="top">
				<td style="word-break: break-word; vertical-align: top;" valign="top">
					<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#ffffff"><![endif]-->
					<div style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1711/memphis_black_right.png');background-position:top center;background-repeat:no-repeat;background-color:#f56565;">
						<div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1711/memphis_black_right.png');background-position:top center;background-repeat:no-repeat;background-color:#f56565;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:transparent;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
									<div style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #000000; width: 100%;" align="center" role="presentation" valign="top">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 15px; padding-bottom: 0px; font-family: Georgia, serif"><![endif]-->
											<div style="color:#ffffff;font-family:Merriwheater, Georgia, serif;line-height:1.5;padding-top:15px;padding-right:40px;padding-bottom:0px;padding-left:40px;">
												<div style="line-height: 1.5; font-size: 12px; color: #ffffff; font-family: Merriwheater, Georgia, serif; mso-line-height-alt: 18px;">
													<p style="font-size: 30px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 45px; margin: 0;"><span style="font-size: 30px; color: #000000;"><strong>Gossipy Chat Mesages</strong></span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 3px; padding-left: 3px; padding-top: 8px; padding-bottom: 3px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
											<div style="color:#000000;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:1.8;padding-top:8px;padding-right:3px;padding-bottom:3px;padding-left:3px;">
												<div style="font-size: 14px; line-height: 1.8; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #000000; mso-line-height-alt: 25px;">
													<p style="font-size: 18px; line-height: 1.8; word-break: break-word; text-align: center; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 32px; margin: 0;"><span style="font-size: 18px;">Your Chat Massages with&nbsp;</span></p>
													<p style="font-size: 28px; line-height: 1.8; word-break: break-word; text-align: center; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 50px; margin: 0;"><span style="font-size: 28px;"><strong>${emName}</strong></span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if (!mso)&(!IE)]><!-->
										</div>
										<!--<![endif]-->
									</div>
								</div>
								<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
								<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
							</div>
						</div>
					</div>
					<div style="background-color:#ffffff;">
						<div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:transparent;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
									<div style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 15px; width: 100%;" align="center" role="presentation" height="15" valign="top">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" height="15" valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if (!mso)&(!IE)]><!-->
										</div>
										<!--<![endif]-->
									</div>
								</div>
								<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
								<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
							</div>
						</div>
                    </div>
                    `;
                    emImg = curImg;
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        var dborigin = row.origin;
                        var dbdata = row.data;
                        if (userId != dborigin) {
                            eml += `<div style="background-color:transparent;">
                            <div class="block-grid mixed-two-up no-stack" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="213" style="background-color:#ffffff;width:213px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
                                    <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 212px; width: 213px;">
                                        <div style="width:100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
                                                <!--<![endif]-->
                                                <div class="img-container left fixedwidth" align="left" style="padding-right: 0px;padding-left: 15px;">
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 15px;" align="left"><![endif]-->
                                                    <div style="font-size:1px;line-height:10px">&nbsp;</div><img alt="I'm an image" border="0" class="left fixedwidth" src="${emImg}" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 85px; display: block;" title="I'm an image" width="85"/>
                                                    <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                </div>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                    <!--[if (mso)|(IE)]></td><td align="center" width="426" style="background-color:#ffffff;width:426px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                    <div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 424px; width: 426px;">
                                        <div style="width:100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                                <!--<![endif]-->
                                                <div class="mobile_hide">
                                                    <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 7px; padding-right: 7px; padding-bottom: 7px; padding-left: 7px;" valign="top">
                                                                    <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" align="center" role="presentation" valign="top">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top;" valign="top">
                                                                                <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 40px; padding-top: 3px; padding-bottom: 0px; font-family: Georgia, serif"><![endif]-->
                                                <div style="color:#000000;font-family:Merriwheater, Georgia, serif;line-height:1.5;padding-top:3px;padding-right:0px;padding-bottom:0px;padding-left:40px;">
                                                    <div style="font-size: 14px; line-height: 1.5; color: #000000; font-family: Merriwheater, Georgia, serif; mso-line-height-alt: 21px;">
                                                        <p style="font-size: 18px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 27px; margin: 0;"><span style="font-size: 18px; color: #2b3940;"><strong><span style>${emName}</span></strong></span></p>
                                                    </div>
                                                </div>
                                                <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 15px; padding-left: 40px; padding-top: 5px; padding-bottom: 10px; font-family: Georgia, serif"><![endif]-->
                                                    <div style="color:#555555;font-family:Merriwheater, Georgia, serif;line-height:1.5;padding-top:5px;padding-right:15px;padding-bottom:10px;padding-left:40px;">
                                                        <div style="font-size: 14px; line-height: 1.5; color: #555555; font-family: Merriwheater, Georgia, serif; mso-line-height-alt: 21px;">
                                                            <p style="font-size: 15px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;">${dbdata}</span></p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>`;
                        } else {
                            eml += `<div style="background-color:transparent;">
                            <div class="block-grid mixed-two-up no-stack" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="213" style="background-color:#ffffff;width:213px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
                                    <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 212px; width: 213px;">
                                        <div style="width:100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
                                                <!--<![endif]-->
                                                <div class="img-container left fixedwidth" align="left" style="padding-right: 0px;padding-left: 15px;">
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 15px;" align="left"><![endif]-->
                                                    <div style="font-size:1px;line-height:10px">&nbsp;</div><img alt="I'm an image" border="0" class="left fixedwidth" src="${userimg}" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 85px; display: block;" title="I'm an image" width="85"/>
                                                    <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                </div>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                    <!--[if (mso)|(IE)]></td><td align="center" width="426" style="background-color:#ffffff;width:426px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                    <div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 424px; width: 426px;">
                                        <div style="width:100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                                <!--<![endif]-->
                                                <div class="mobile_hide">
                                                    <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 7px; padding-right: 7px; padding-bottom: 7px; padding-left: 7px;" valign="top">
                                                                    <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" align="center" role="presentation" valign="top">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top;" valign="top">
                                                                                <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 40px; padding-top: 3px; padding-bottom: 0px; font-family: Georgia, serif"><![endif]-->
                                                <div style="color:#000000;font-family:Merriwheater, Georgia, serif;line-height:1.5;padding-top:3px;padding-right:0px;padding-bottom:0px;padding-left:40px;">
                                                    <div style="font-size: 14px; line-height: 1.5; color: #000000; font-family: Merriwheater, Georgia, serif; mso-line-height-alt: 21px;">
                                                        <p style="font-size: 18px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 27px; margin: 0;"><span style="font-size: 18px; color: #2b3940;"><strong><span style>You</span></strong></span></p>
                                                    </div>
                                                </div>
                                                <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 15px; padding-left: 40px; padding-top: 5px; padding-bottom: 10px; font-family: Georgia, serif"><![endif]-->
                                                    <div style="color:#555555;font-family:Merriwheater, Georgia, serif;line-height:1.5;padding-top:5px;padding-right:15px;padding-bottom:10px;padding-left:40px;">
                                                        <div style="font-size: 14px; line-height: 1.5; color: #555555; font-family: Merriwheater, Georgia, serif; mso-line-height-alt: 21px;">
                                                            <p style="font-size: 15px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;">${dbdata}</span></p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>`;
                        }
                    }
                    eml += `		<div style="background-color:transparent;">
                    <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                            <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:transparent;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                            <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
                                <div style="width:100% !important;">
                                    <!--[if (!mso)&(!IE)]><!-->
                                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                        <!--<![endif]-->
                                        <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
                                            <tbody>
                                                <tr style="vertical-align: top;" valign="top">
                                                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
                                                        <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 50px; width: 100%;" align="center" role="presentation" height="50" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align: top;" valign="top">
                                                                    <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" height="50" valign="top"><span></span></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <!--[if (!mso)&(!IE)]><!-->
                                    </div>
                                    <!--<![endif]-->
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                        </div>
                    </div>
                </div>
                <div style="background-color:#f6d16c;">
                    <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6d16c;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                            <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:transparent;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                            <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
                                <div style="width:100% !important;">
                                    <!--[if (!mso)&(!IE)]><!-->
                                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                        <!--<![endif]-->
                                        <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
                                            <tbody>
                                                <tr style="vertical-align: top;" valign="top">
                                                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
                                                        <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 5px; width: 100%;" align="center" role="presentation" height="5" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align: top;" valign="top">
                                                                    <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" height="5" valign="top"><span></span></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <!--[if (!mso)&(!IE)]><!-->
                                    </div>
                                    <!--<![endif]-->
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                        </div>
                    </div>
                </div>
                <div style="background-color:#000000;">
                    <div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#000000;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                            <!--[if (mso)|(IE)]><td align="center" width="426" style="background-color:transparent;width:426px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                            <div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 424px; width: 426px;">
                                <div style="width:100% !important;">
                                    <!--[if (!mso)&(!IE)]><!-->
                                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                        <!--<![endif]-->
                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                        <!--[if mso]></td></tr></table><![endif]-->
                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top: 15px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                        <div style="color:#555555;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:15px;padding-right:20px;padding-bottom:10px;padding-left:20px;">
                                            <div style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;">
                                                <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 17px; margin: 0;"><span style="color: #ffffff;">Thank You</span></p>
                                                <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 17px; margin: 0;"><span style="color: #ffffff;">Your Gossipy team</span></p>
                                                <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 17px; margin: 0;"><span style="color: #ffffff;">Gossipy&nbsp;</span></p>
                                            </div>
                                        </div>
                                        <!--[if mso]></td></tr></table><![endif]-->
                                        <!--[if (!mso)&(!IE)]><!-->
                                    </div>
                                    <!--<![endif]-->
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                            <!--[if (mso)|(IE)]></td><td align="center" width="213" style="background-color:transparent;width:213px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                            <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 212px; width: 213px;">
                                <div style="width:100% !important;">
                                    <!--[if (!mso)&(!IE)]><!-->
                                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                        <!--<![endif]-->
                                        <div></div>
                                        <!--[if (!mso)&(!IE)]><!-->
                                    </div>
                                    <!--<![endif]-->
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                        </div>
                    </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
        </tr>
    </tbody>
</table>
<!--[if (IE)]></div><![endif]-->
</body>

</html>`;
                    Email.send({
                        SecureToken: '119525f6-af80-4e4c-9e85-8245cad29b62',
                        From: 'verify.gossipy@gmail.com',
                        To: usEmail,
                        Subject: 'Email of ' + curName + ' chats',
                        Body: eml
                    }).then(
                        message => {
                            alert("We have sent the Email. You can check your email for the same...");
                        }
                    );
                } else {
                    alert('No chat to send from user ' + curName);
                }
            })
        })
    }
}

/*
<div style="background-color:transparent;">
						<div class="block-grid mixed-two-up no-stack" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="213" style="background-color:#ffffff;width:213px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
								<div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 212px; width: 213px;">
									<div style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div class="img-container left fixedwidth" align="left" style="padding-right: 0px;padding-left: 15px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 15px;" align="left"><![endif]-->
												<div style="font-size:1px;line-height:10px">&nbsp;</div><img class="${emImg}" alt="I'm an image" title="I'm an image" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 85px; display: block;" width="85">
												<div style="font-size:1px;line-height:10px">&nbsp;</div>
												<!--[if mso]></td></tr></table><![endif]-->
											</div>
											<!--[if (!mso)&(!IE)]><!-->
										</div>
										<!--<![endif]-->
									</div>
								</div>
								<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
								<!--[if (mso)|(IE)]></td><td align="center" width="426" style="background-color:#ffffff;width:426px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
								<div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 424px; width: 426px;">
									<div style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div class="mobile_hide">
												<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
													<tbody>
														<tr style="vertical-align: top;" valign="top">
															<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 7px; padding-right: 7px; padding-bottom: 7px; padding-left: 7px;" valign="top">
																<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" align="center" role="presentation" valign="top">
																	<tbody>
																		<tr style="vertical-align: top;" valign="top">
																			<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 40px; padding-top: 3px; padding-bottom: 0px; font-family: Georgia, serif"><![endif]-->
											<div style="color:#000000;font-family:Merriwheater, Georgia, serif;line-height:1.5;padding-top:3px;padding-right:0px;padding-bottom:0px;padding-left:40px;">
												<div style="font-size: 14px; line-height: 1.5; color: #000000; font-family: Merriwheater, Georgia, serif; mso-line-height-alt: 21px;">
													<p style="font-size: 18px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 27px; margin: 0;"><span style="font-size: 18px; color: #2b3940;"><strong><span style>${emName}</span></strong></span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 15px; padding-left: 40px; padding-top: 5px; padding-bottom: 10px; font-family: Georgia, serif"><![endif]-->
												<div style="color:#555555;font-family:Merriwheater, Georgia, serif;line-height:1.5;padding-top:5px;padding-right:15px;padding-bottom:10px;padding-left:40px;">
													<div style="font-size: 14px; line-height: 1.5; color: #555555; font-family: Merriwheater, Georgia, serif; mso-line-height-alt: 21px;">
														<p style="font-size: 15px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;">${dbdata}</span></p>
													</div>
												</div>
												<!--[if mso]></td></tr></table><![endif]-->
											<!--[if (!mso)&(!IE)]><!-->
										</div>
										<!--<![endif]-->
									</div>
								</div>
								<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
								<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
							</div>
						</div>
					</div>
                    */