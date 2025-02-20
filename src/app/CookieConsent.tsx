"use client";
import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as VanillaCookieConsent from "vanilla-cookieconsent";
import * as m from "@/paraglide/messages";

export default function CookieConsent() {
  useEffect(() => {
    VanillaCookieConsent.run({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
      },
      // we dont actually need to do any language detection, this will be done by paraglide
      language: {
        default: "de",
        translations: {
          de: {
            consentModal: {
              title: m.weUseCookies(),
              description: m.weUseCookiesDescription(),
              acceptAllBtn: m.acceptAll(),
              acceptNecessaryBtn: m.rejectAll(),
              showPreferencesBtn: m.managePreferences(),
            },
            preferencesModal: {
              title: m.managePreferences(),
              acceptAllBtn: m.acceptAll(),
              acceptNecessaryBtn: m.rejectAll(),
              savePreferencesBtn: m.save(),
              closeIconLabel: m.close(),
              sections: [
                // {
                // 	title: 'Cookie usage',
                // 	description:
                // 		'We use cookies to ensure the basic functionalities of the website and to enhance your online experience ...'
                // },
                {
                  title: m.technicalNecessary(),
                  description: m.technicalNecessaryDescription(),
                  linkedCategory: "necessary",
                },
                // {
                // 	title: 'More information',
                // 	description:
                // 		'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="#yourdomain.com">contact us</a>.'
                // }
              ],
            },
          },
        },
      },
    });
  }, []);

  return <></>;
}
