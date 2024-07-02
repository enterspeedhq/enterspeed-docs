# User Login

Using the Enterspeed Management App you can sign in using a local user or an Active Directory user.

<div style={{textAlign: "center"}}>
    ![Create source Enterspeed](/img/docs/user-login/login.png)
</div>

## Local User

If you want to work with a local user, you can create one by clicking the Sign up now link on the [login page](https://app.enterspeed.com).

Here you can create a user by providing an email and a password.

Once a user is created and signed in, you can start creating your first tenant or if you got an invite to an existing tenant you can accept the invite.

## Active Directory User

If you preferre to work with an AD user, you must first have a [Microsoft Entra ID](https://www.microsoft.com/en-us/security/business/microsoft-entra) user (former know as Azure Active Directory).

Once you have that in place you can simply click the Sign-in with work account button, no configuration needed in Enterspeed. 

The first time you sign in with an AD user a new Enterspeed user will automatically be created for you.

:::info
If you already have one or more tenants on a local users and you want to move these tenant to a new AD user, just let us know, and we can move the tenants to the new AD user for you.
:::

## FAQ

**💭 Got a question? We might already have the answer!**

<details>
<summary>Which Active Directory providers do Enterspeed support?</summary>

Currently we support Microsoft Entra ID, former known as Azure Active Directory.

If you need support for other AD providers, please reach out to us.

</details>

<details>
<summary>Can I have a local user and an Active Direcotory user at the same time?</summary>

Yes, you can have both a local user and an Active Directory user, but not with the same email address.

</details>

